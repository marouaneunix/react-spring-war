package ma.norsys.pocscheduler.service;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import ma.norsys.pocscheduler.controller.dto.*;
import ma.norsys.pocscheduler.domain.Client;
import ma.norsys.pocscheduler.domain.Invoice;
import ma.norsys.pocscheduler.domain.Voucher;
import ma.norsys.pocscheduler.repository.ClientRepository;
import ma.norsys.pocscheduler.repository.InvoiceRepository;
import ma.norsys.pocscheduler.repository.VoucherRepository;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class InvoiceService {

    private final VoucherRepository voucherRepository;
    private final ClientRepository clientRepository;
    private final InvoiceRepository invoiceRepository;
    private final ObjectMapper objectMapper;

    public InvoiceDto findInvoiceByClientAndMonth(InvoiceRequestDto dto) throws JsonProcessingException{
        Optional<Client> clientOptional = clientRepository.findById(dto.getClient());
        ClientDto clientDto = new ClientDto(
                clientOptional.get().getId(),
                clientOptional.get().getName(),
                clientOptional.get().getSociety(),
                clientOptional.get().getIce(),
                0,
                clientOptional.get().getArchivedAt()
        );
        InvoiceDto invoiceResult = null;
        if(clientOptional.isPresent()) {
            List<Invoice> invoices = invoiceRepository.findByClientAndMonthAndYear(clientOptional.get(), dto.getMonth(), dto.getYear());
            if(invoices.size() > 0) {
                Invoice invoice = invoices.get(0);
                clientDto.setNbrVoucher(0);
                invoiceResult = new InvoiceDto(
                    invoice.getId(),
                    invoice.getDetails(),
                    invoice.getPrices(),
                    invoice.getSurplus(),
                    invoice.getMonth(),
                    invoice.getYear(),
                    clientDto
                );
            } else {
                invoiceResult = new InvoiceDto();
                List<Voucher> vouchers = voucherRepository.findByClientAndMonthAndYear(clientOptional.get(), Integer.valueOf(dto.getMonth()), dto.getYear());
                Map<Long, Map<Integer, Integer>> detailsMap = new HashMap<>();
                vouchers.forEach(voucher -> {
                    Map<String,Integer> map = new HashMap<String,Integer>();
                    try {
                        map = this.objectMapper.readValue(voucher.getDetails(), HashMap.class);
                    } catch (JsonProcessingException e) {
                        throw new RuntimeException(e);
                    }
                    for (Map.Entry<String, Integer> entry : map.entrySet()) {
                        Long key = Long.parseLong(entry.getKey());
                        Map<Integer, Integer> productDetails = null;
                        if (detailsMap.containsKey(key)) {
                            productDetails = detailsMap.get(key);
                        } else {
                            productDetails = new HashMap<Integer, Integer>();
                        }
                        Calendar calendar = Calendar.getInstance();
                        calendar.setTime(voucher.getDay());
                        productDetails.put(calendar.get(Calendar.DAY_OF_MONTH),entry.getValue());
                        detailsMap.put(key, productDetails);
                    }
                });
                ObjectMapper objectMapper = new ObjectMapper();
                String detailsJson = objectMapper.writeValueAsString(detailsMap);
                clientDto.setNbrVoucher(vouchers.size());
                invoiceResult.setDetails(detailsJson);
                invoiceResult.setMonth(dto.getMonth());
                invoiceResult.setYear(dto.getYear());
                invoiceResult.setClient(clientDto);
            }
        } else {
            return  null;
        }
        return invoiceResult;
    }

    public InvoiceDto saveClientInvoice(InvoiceDto dto) throws ParseException, JsonProcessingException {
        Invoice invoice = null;
        Optional<Client> clientOptional = clientRepository.findById(dto.getClient().getId());

        if(dto.getId() != null) {
            List<Invoice> invoices = invoiceRepository.findByClientAndMonthAndYear(clientOptional.get(), dto.getMonth(), dto.getYear());
            invoice = invoices.get(0);
            invoice.setDetails(dto.getDetails());
            invoiceRepository.save(invoice);
        } else {
            invoice = new Invoice(null, new Date(), dto.getDetails(), dto.getSurplus(), dto.getPrices(), dto.getMonth(), dto.getYear(), clientOptional.get());
            invoiceRepository.save(invoice);
            dto.setId(invoice.getId());
        }
        this.updateInvoiceVouchers(dto.getProductDetailsList(), clientOptional.get(), dto.getMonth(), dto.getYear());
        return dto;
    }

    private void updateInvoiceVouchers(List<ProductDetailsDto> details, Client client, String month, String year) throws ParseException, JsonProcessingException {
        Map<Integer, Map<Integer, Integer>> vouchers = new HashMap<>();
        for(Integer i=1;i<=31;i++){
            vouchers.put(i, new HashMap<>());
        }
        details.forEach(detail -> {
            detail.getQuantityByDays().forEach(day -> {
                vouchers.get(day.getDay()).put(detail.getProductId(), day.getQuantity());
            });
        });
        for (Map.Entry<Integer, Map<Integer, Integer>> entry : vouchers.entrySet()) {
            if(!entry.getValue().isEmpty()) {
                SimpleDateFormat formatter = new SimpleDateFormat("dd-M-yyyy hh:mm:ss", Locale.ENGLISH);
                Date date = formatter.parse((entry.getKey() < 10 ? "0" : "")+entry.getKey()+"-"+month+"-"+year+" 01:00:00");
                List<Voucher> voucherResult = voucherRepository.findByClientAndDay(client, date);
                ObjectMapper objectMapper = new ObjectMapper();
                String detailsJson = objectMapper.writeValueAsString(entry.getValue());
                Voucher voucher = null;
                if(voucherResult.size() > 0) {
                    voucher = voucherResult.get(0);
                } else {
                    Calendar calendar = Calendar.getInstance();
                    calendar.setTime(date);
                    voucher = new Voucher();
                    voucher.setDay(date);
                    voucher.setMonth(calendar.get(Calendar.MONTH) + 1);
                    voucher.setYear(calendar.get(Calendar.YEAR));
                    voucher.setCreatedAt(new Date());
                    voucher.setClient(client);
                }
                voucher.setDetails(detailsJson);
                voucherRepository.save(voucher);
            }
        }
    }
}
