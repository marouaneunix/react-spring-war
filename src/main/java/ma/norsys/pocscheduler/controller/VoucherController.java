package ma.norsys.pocscheduler.controller;

import lombok.RequiredArgsConstructor;
import ma.norsys.pocscheduler.controller.dto.VoucherDto;
import ma.norsys.pocscheduler.controller.dto.VoucherRequestDto;
import ma.norsys.pocscheduler.service.VoucherService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/voucher")
@RequiredArgsConstructor
@CrossOrigin("*")
public class VoucherController {

    private final VoucherService voucherService;

    @GetMapping
    public List<VoucherDto> findByMonth(VoucherRequestDto voucherRequestDto) {
        return voucherService.findByClientAndMonth(voucherRequestDto);
    }

    @PostMapping
    public VoucherDto saveVoucher(@RequestBody VoucherDto voucherDto){
        return  voucherService.saveVoucher(voucherDto);
    }
}
