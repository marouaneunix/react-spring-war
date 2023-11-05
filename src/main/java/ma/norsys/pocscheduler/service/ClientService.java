package ma.norsys.pocscheduler.service;


import lombok.RequiredArgsConstructor;
import ma.norsys.pocscheduler.controller.dto.VoucherDto;
import ma.norsys.pocscheduler.domain.Client;
import ma.norsys.pocscheduler.controller.dto.ClientDto;
import ma.norsys.pocscheduler.domain.Voucher;
import ma.norsys.pocscheduler.repository.ClientRepository;
import ma.norsys.pocscheduler.repository.VoucherRepository;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ClientService {

    private final ClientRepository clientRepository;

    private final VoucherRepository voucherRepository;

        public Map<String, ArrayList<ClientDto>> findAll() {
            Map<String, ArrayList<ClientDto>> articleMapOne;
            articleMapOne = new HashMap<>();
            articleMapOne.put("actives", new ArrayList<>());
            articleMapOne.put("archives", new ArrayList<>());
            clientRepository.findAll().forEach(client -> {
                List<Voucher> vouchers = voucherRepository.findByClientAndMonth(client, (Calendar.getInstance()).get(Calendar.MONTH));
                ClientDto clientDto = new ClientDto(client.getId(), client.getName(), client.getSociety(), client.getIce(), vouchers.size(), client.getArchivedAt());
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

        public ClientDto findById(Long id) {
            return  clientRepository.findById(id).map(client -> {
                List<Voucher> vouchers = voucherRepository.findByClientAndMonth(client, (Calendar.getInstance()).get(Calendar.MONTH));
                return  new ClientDto(client.getId(), client.getName(), client.getSociety(), client.getIce(), vouchers.size(), client.getArchivedAt());
            }).orElse(null);

        }

    public ClientDto saveClient(ClientDto clientDto) {
        Client client = null;
        if(clientDto.getId() != null) {
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
