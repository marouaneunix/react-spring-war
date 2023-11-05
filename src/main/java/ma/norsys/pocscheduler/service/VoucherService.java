package ma.norsys.pocscheduler.service;


import lombok.RequiredArgsConstructor;
import ma.norsys.pocscheduler.controller.dto.VoucherDto;
import ma.norsys.pocscheduler.controller.dto.VoucherRequestDto;
import ma.norsys.pocscheduler.domain.Client;
import ma.norsys.pocscheduler.domain.Voucher;
import ma.norsys.pocscheduler.repository.ClientRepository;
import ma.norsys.pocscheduler.repository.VoucherRepository;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class VoucherService {

    private final VoucherRepository voucherRepository;
    private final ClientRepository clientRepository;

    public List<VoucherDto> findByClientAndMonth(VoucherRequestDto dto) {
        Optional<Client> clientOptional = clientRepository.findById(dto.getClient());
        return clientOptional.map(client -> voucherRepository.findByClientAndMonth(client, dto.getMonth())
                .stream().map(voucher ->
                        new VoucherDto(
                                voucher.getId(),
                                voucher.getTotal(),
                                voucher.getDetails(),
                                voucher.getDay(),
                                voucher.getMonth(),
                                voucher.getClient().getId()
                        ))
                .collect(Collectors.toList())).orElse(null);
    }

    public VoucherDto saveVoucher(VoucherDto voucherDto) {
        Voucher voucher = null;
        if(voucherDto.getId() != null) {
            Optional<Voucher> voucherOptional = voucherRepository.findById(voucherDto.getId());
            voucher = voucherOptional.get();
        } else {
            voucher = new Voucher();
            Optional<Client> clientOptional = clientRepository.findById(voucherDto.getClient());
            voucher.setClient(clientOptional.get());
        }
        voucher.setDay(voucherDto.getDay());
        voucher.setMonth(voucherDto.getMonth());
        voucher.setTotal(voucherDto.getTotal());
        voucher.setDetails(voucherDto.getDetails());
        voucher.setCreatedAt(new Date());
        voucherRepository.save(voucher);

        voucherDto.setId(voucher.getId());
        return voucherDto;
    }
}
