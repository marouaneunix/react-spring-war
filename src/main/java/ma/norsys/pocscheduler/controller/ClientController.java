package ma.norsys.pocscheduler.controller;

import lombok.RequiredArgsConstructor;
import ma.norsys.pocscheduler.controller.dto.ClientSurplusDto;
import ma.norsys.pocscheduler.service.ClientService;
import ma.norsys.pocscheduler.service.ClientSurplusService;
import ma.norsys.pocscheduler.controller.dto.ClientDto;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Map;

@RestController
@RequestMapping("/api/client")
@RequiredArgsConstructor
@CrossOrigin("*")
public class ClientController {

    private final ClientService clientService;
    private final ClientSurplusService clientSurplusService;

    @GetMapping
    public Map<String, ArrayList<ClientDto>> findAll() {
        return clientService.findAll();
    }

    @PostMapping
    public ClientDto saveClient(@RequestBody ClientDto clientDto){
        return clientService.saveClient(clientDto);
    }

    @PostMapping("/archive/{id}")
    public Long archiveClient(@PathVariable("id") long id){
        return clientService.archiveClient(id);
    }

    @PostMapping("/activate/{id}")
    public Long activateClient(@PathVariable("id") long id){
        return clientService.activateClient(id);
    }

    @PostMapping("/{id}/surplus")
    public Long saveClientSurplus(@PathVariable("id") long id, @RequestBody ClientSurplusDto details){
        return clientSurplusService.saveClientSurplus(id, details);
    }

    @GetMapping("/{id}/surplus")
    public ClientSurplusDto findClientSurplusById(@PathVariable("id") long id) {
        return clientSurplusService.findByClient(id);
    }
}
