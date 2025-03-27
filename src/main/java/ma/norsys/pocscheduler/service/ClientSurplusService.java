package ma.norsys.pocscheduler.service;


import lombok.RequiredArgsConstructor;
import ma.norsys.pocscheduler.domain.Client;
import ma.norsys.pocscheduler.repository.ClientRepository;
import ma.norsys.pocscheduler.repository.ClientSurplusRepository;
import ma.norsys.pocscheduler.controller.dto.ClientSurplusDto;
import ma.norsys.pocscheduler.domain.ClientSurplus;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ClientSurplusService {

    private final ClientSurplusRepository clientSurplusRepository;
    private final ClientRepository clientRepository;

    public List<ClientSurplusDto> findAll() {
        return clientSurplusRepository.findAll().stream().map(surplus -> new ClientSurplusDto(surplus.getId(), surplus.getGeneratedAt(), surplus.getDetails(), surplus.getClient().getId())).collect(Collectors.toList());
    }

    public ClientSurplusDto findByClient(long clientId) {
        Optional<Client> client = clientRepository.findById(clientId);
        if(client.isPresent()) {
            List<ClientSurplus> csp = clientSurplusRepository.findByClient(client.get());
            return csp.size() > 0
                    ? csp.stream().map(surplus -> new ClientSurplusDto(
                            surplus.getId(), surplus.getGeneratedAt(), surplus.getDetails(), surplus.getClient().getId()
                        )).toList().get(0)
                    : null;
        } else {
            return null;
        }
    }

    public long saveClientSurplus(Long id, ClientSurplusDto detail) {
        Optional<Client> client = clientRepository.findById(id);
        ClientSurplus surplus = null;
        if(client.isPresent()) {
            List<ClientSurplus> csp = clientSurplusRepository.findByClient(client.get());
            if(csp.size() > 0 ){
                surplus =csp.get(0);
            }else {
                surplus =new ClientSurplus();
                surplus.setClient(client.get());
                surplus.setGeneratedAt(new Date());
            }
        } else {
            return 0;
        }
        surplus.setDetails(detail.getDetails());
        clientSurplusRepository.save(surplus);
        return surplus.getId();
    }
}
