package sn.uasz.m1.gl.ms_etudiant.grpc;

import io.grpc.stub.StreamObserver;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.grpc.server.service.GrpcService;

import sn.uasz.m1.gl.ms_etudiant.repository.EtudiantRepository;
import sn.uasz.m1.gl.ms_etudiant.model.Etudiant;  // Entité métier

import java.util.List;

@GrpcService
public class EtudiantGrpcServiceImpl extends EtudiantServiceGrpc.EtudiantServiceImplBase {

    @Autowired
    private EtudiantRepository repository;

    @Override
    public void getEtudiantsByClasseId(ClasseRequest request, StreamObserver<EtudiantListResponse> responseObserver) {
        List<Etudiant> etudiantsModel = repository.findByClasseId(request.getClasseId());

        EtudiantListResponse.Builder responseBuilder = EtudiantListResponse.newBuilder();

        for (Etudiant etudiantModel : etudiantsModel) {
            // On crée un objet protobuf à partir du modèle métier
            sn.uasz.m1.gl.ms_etudiant.grpc.Etudiant grpcEtudiant = sn.uasz.m1.gl.ms_etudiant.grpc.Etudiant.newBuilder()
                .setId(etudiantModel.getId())
                .setMatricule(etudiantModel.getMatricule())
                .setNom(etudiantModel.getNom())
                .setPrenom(etudiantModel.getPrenom())
                .setTelephone(etudiantModel.getTelephone())
                .setAdresse(etudiantModel.getAdresse())
                .setClasseId(etudiantModel.getClasseId())
                .build();

            responseBuilder.addEtudiants(grpcEtudiant);
        }

        responseObserver.onNext(responseBuilder.build());
        responseObserver.onCompleted();
    }
}
