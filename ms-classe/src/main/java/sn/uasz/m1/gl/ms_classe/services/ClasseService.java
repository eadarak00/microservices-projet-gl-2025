package sn.uasz.m1.gl.ms_classe.services;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import sn.uasz.m1.gl.ms_classe.entities.Classe;
import sn.uasz.m1.gl.ms_classe.repositories.ClasseRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ClasseService {

    private  final ClasseRepository repository;

    public Classe save(Classe c) { return repository.save(c); }

    public Classe update(String id, Classe c) {
        Classe existing = repository.findById(id).orElseThrow();
        existing.setLibelle(c.getLibelle());
        existing.setDepartememt(c.getDepartememt());
        existing.setSpecialite(c.getSpecialite());
        existing.setNiveau(c.getNiveau());
        return repository.save(existing);
    }

    public void delete(String id) { repository.deleteById(id); }

    public Classe getById(String id) { return repository.findById(id).orElseThrow(); }

    public List<Classe> searchByNom(String nom) {
        return repository.findByNomContainingIgnoreCase(nom);
    }

    public List<Classe> getAll() {
        return repository.findAll();
    }
}
