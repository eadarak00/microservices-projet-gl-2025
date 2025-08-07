package sn.uasz.m1.gl.ms_classe.controller;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import sn.uasz.m1.gl.ms_classe.entities.Classe;
import sn.uasz.m1.gl.ms_classe.services.ClasseService;

@RestController
@RequiredArgsConstructor
public class ClasseRestController {

    private final ClasseService service;

    @PostMapping(value = "/", consumes = MediaType.APPLICATION_JSON_VALUE)
    public Classe create(@RequestBody Classe c) {
        return service.save(c);
    }

    @PutMapping("/{id}")
    public Classe update(@PathVariable String id, @RequestBody Classe c) {
        return service.update(id, c);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        service.delete(id);
    }
}
