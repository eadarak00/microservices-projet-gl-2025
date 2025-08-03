package sn.uasz.m1.gl.ms_classe.entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Document("classes")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class classe {
    @Id
    private Long id;
    private String libelle;
    private String niveau;
    private String specialite;
    private String departememt;
}
