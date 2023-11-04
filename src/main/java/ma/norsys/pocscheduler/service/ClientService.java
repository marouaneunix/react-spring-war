package ma.norsys.pocscheduler.service;


import lombok.RequiredArgsConstructor;
import ma.norsys.pocscheduler.domain.Client;
import ma.norsys.pocscheduler.controller.dto.ClientDto;
import ma.norsys.pocscheduler.repository.ClientRepository;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class ClientService {

        private final ClientRepository clientRepository;

        public Map<String, ArrayList<ClientDto>> findAll() {
            Map<String, ArrayList<ClientDto>> articleMapOne;
            articleMapOne = new HashMap<>();
            articleMapOne.put("actives", new ArrayList<>());
            articleMapOne.put("archives", new ArrayList<>());
            clientRepository.findAll().forEach(client -> {
                ClientDto clientDto = new ClientDto(client.getId(), client.getName(), client.getSociety(), client.getIce(), client.getArchivedAt());
                if(client.getArchivedAt() == null) {
                    ArrayList<ClientDto> actives = articleMapOne.get("actives");
                    actives.add(clientDto);
                    articleMapOne.put("actives", actives);
                } else {
                    ArrayList<ClientDto> archives = articleMapOne.get("archives");
                    archives.add(clientDto);
                    articleMapOne.put("archives", archives);
                }
            });
            return articleMapOne;
        }

    public ClientDto saveClient(ClientDto clientDto) {
        Client client = null;
        if(clientDto.getIce() != null) {
            Optional<Client> clientOptional = clientRepository.findById(clientDto.getId());
            client = clientOptional.get();
        } else {
            client = new Client();
        }
        client.setName(clientDto.getName());
        client.setSociety(clientDto.getSociety());
        client.setIce(clientDto.getIce());
        clientRepository.save(client);
        clientDto.setId(client.getId());
        return clientDto;
    }

    public Long archiveClient(Long id) {
        Optional<Client> client = clientRepository.findById(id);
        Client archivedClient = client.get();
        archivedClient.setArchivedAt(new Date());
        clientRepository.save(archivedClient);
        return id;
    }

    public Long activateClient(Long id) {
        Optional<Client> client = clientRepository.findById(id);
        Client activatedClient = client.get();
        activatedClient.setArchivedAt(null);
        clientRepository.save(activatedClient);
        return id;
    }
}
