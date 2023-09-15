package ma.norsys.pocscheduler.controller;

import lombok.RequiredArgsConstructor;
import ma.norsys.pocscheduler.service.VoucherService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
public class TaskController {

    private final VoucherService voucherService;

    @GetMapping
    public List<VoucherDto> findAll() {
        return voucherService.findAll();
    }

    @PostMapping
    public void saveTask(@RequestBody VoucherDto voucherDto){
        voucherService.saveVoucher();
    }


}
