package sn.uasz.m1.gl.ms_etudiant.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import sn.uasz.m1.gl.ms_etudiant.model.Etudiant;
import sn.uasz.m1.gl.ms_etudiant.repository.EtudiantRepository;

import java.util.List;

@Service
public class EtudiantService {

    @Autowired
    private EtudiantRepository repository;
    
    //Ajouter une Etudiant
    public Etudiant ajouter(Etudiant etudiant){
        
       return repository.save(etudiant);
    }

    //Lister Etudiant
    public List<Etudiant> lister(){
        return repository.findAll();
    }

    //Rechercher une Etudiant
    public Etudiant rechercher(String id){
        return repository.findById(id).get();
    }

    public  List<Etudiant> rechercherParPrenom(String prenom){
    
        return repository.findByPrenomStartingWithIgnoreCase(prenom);
    }
        

    //Modifier une Etudiant
    public Etudiant modifier(String id, Etudiant p) {
    Optional<Etudiant> optionalEtudiant = repository.findById(id);

     
        Etudiant modifP = optionalEtudiant.get();

        modifP.setMatricule(p.getMatricule());
        modifP.setNom(p.getNom());
        modifP.setPrenom(p.getPrenom());
        modifP.setTelephone(p.getTelephone());
        modifP.setAdresse(p.getAdresse());
        

        return repository.save(modifP);

}


    //Supprimer une Etudiant
    public void supprimer(String id){
        repository.deleteById(id);
    }
}
