package ma.norsys.pocscheduler.controller;

import lombok.RequiredArgsConstructor;
import ma.norsys.pocscheduler.controller.dto.ProductDto;
import ma.norsys.pocscheduler.service.ProductService;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Map;

@RestController
@RequestMapping("/api/product")
@RequiredArgsConstructor
@CrossOrigin("*")
public class ProductController {

    private final ProductService productService;

    @GetMapping
    public Map<String, ArrayList<ProductDto>> findAll() {
        return productService.findAll();
    }

    @PostMapping
    public void saveProduct(@RequestBody ProductDto productDto){
        productService.saveProduct(productDto);
    }

    @PostMapping
    @RequestMapping("/delete")
    public void deleteProduct(@RequestBody Long id){
        productService.deleteProduct(id);
    }
}
