package ma.washmenara.pocscheduler.controller;

import lombok.RequiredArgsConstructor;
import ma.washmenara.pocscheduler.controller.dto.VoucherDto;
import ma.washmenara.pocscheduler.service.VoucherService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/voucher")
@RequiredArgsConstructor
@CrossOrigin("*")
public class VoucherController {

    private final VoucherService voucherService;

    @GetMapping
    public List<VoucherDto> findAll() {
        return voucherService.findAll();
    }

//    @PostMapping
//    public void saveTask(@RequestBody VoucherDto voucherDto){
//        voucherService.saveVoucher();
//    }
}
