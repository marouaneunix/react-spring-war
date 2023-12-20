package ma.norsys.pocscheduler.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import ma.norsys.pocscheduler.controller.dto.InvoiceDto;
import ma.norsys.pocscheduler.controller.dto.InvoiceRequestDto;
import ma.norsys.pocscheduler.service.InvoiceService;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.List;

@RestController
@RequestMapping("/api/invoice")
@RequiredArgsConstructor
@CrossOrigin("*")
public class InvoiceController {

    private final InvoiceService invoiceService;

    @CrossOrigin("*")
    @GetMapping
    public InvoiceDto findByMonth(InvoiceRequestDto requestDto) throws JsonProcessingException {
        return invoiceService.findInvoiceByClientAndMonthAndYear(requestDto);
    }

    @CrossOrigin("*")
    @PostMapping
    public InvoiceDto saveClientInvoice(@RequestBody InvoiceDto invoiceDto) throws ParseException, JsonProcessingException {
        return  invoiceService.saveClientInvoice(invoiceDto);
    }

    @CrossOrigin("*")
    @PostMapping("/details")
    public InvoiceDto saveClientInvoiceDetails(@RequestBody InvoiceDto invoiceDto) throws ParseException, JsonProcessingException {
        return  invoiceService.saveClientInvoiceDetails(invoiceDto);
    }

    @CrossOrigin("*")
    @PostMapping("/settings")
    public InvoiceDto saveClientInvoiceSettings(@RequestBody InvoiceDto invoiceDto) throws ParseException, JsonProcessingException {
        return  invoiceService.saveClientInvoiceSettings(invoiceDto);
    }
}
