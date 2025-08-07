package sn.uasz.m1.gl.ms_classe.entities;

// import java.util.List;

import org.springframework.data.annotation.Id;
// import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
// import sn.uasz.m1.gl.ms_etudiant.grpc.Etudiant;

@Document("classes")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Classe {
    @Id
    private String id;
    private String libelle;
    private String niveau;
    private String specialite;
    private String departement;
}
