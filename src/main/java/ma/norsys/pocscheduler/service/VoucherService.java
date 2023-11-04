package ma.washmenara.pocscheduler.service;


import lombok.RequiredArgsConstructor;
import ma.washmenara.pocscheduler.controller.dto.VoucherDto;
import ma.washmenara.pocscheduler.domain.Voucher;
import ma.washmenara.pocscheduler.repository.VoucherRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class VoucherService {

    private final VoucherRepository voucherRepository;

        public List<VoucherDto> findAll() {
        return voucherRepository.findAll().stream().map(voucher -> new VoucherDto(voucher.getTotal())).collect(Collectors.toList());
    }

    public void saveVoucher() {
        Voucher voucher = new Voucher();
        voucher.setTotal(20);
        voucherRepository.save(voucher);
    }
}
