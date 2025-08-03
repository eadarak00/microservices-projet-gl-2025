package sn.uasz.m1.gl.ms_classe.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import lombok.RequiredArgsConstructor;
import sn.uasz.m1.gl.ms_classe.entities.Classe;
import sn.uasz.m1.gl.ms_classe.services.ClasseService;

@RestController
@RequestMapping("/classe")
@RequiredArgsConstructor
public class ClasseRestController {

    private final ClasseService service;

    @PostMapping
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
