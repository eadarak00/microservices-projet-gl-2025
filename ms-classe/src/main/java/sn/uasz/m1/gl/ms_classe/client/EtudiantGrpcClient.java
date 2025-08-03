package sn.uasz.m1.gl.ms_classe.client;

import io.grpc.ManagedChannel;
import io.grpc.ManagedChannelBuilder;
import org.springframework.stereotype.Service;

import sn.uasz.m1.gl.ms_etudiant.grpc.ClasseRequest;
import sn.uasz.m1.gl.ms_etudiant.grpc.EtudiantListResponse;
import sn.uasz.m1.gl.ms_etudiant.grpc.EtudiantServiceGrpc;

@Service
public class EtudiantGrpcClient {

    private final EtudiantServiceGrpc.EtudiantServiceBlockingStub stub;

    public EtudiantGrpcClient() {
        ManagedChannel channel = ManagedChannelBuilder
                .forAddress("localhost", 9002)  // port gRPC exposé par ms-etudiant
                .usePlaintext()
                .build();

        stub = EtudiantServiceGrpc.newBlockingStub(channel);
    }

    public EtudiantListResponse getEtudiantsByClasseId(String classeId) {
        ClasseRequest request = ClasseRequest.newBuilder()
                .setClasseId(classeId)
                .build();

        return stub.getEtudiantsByClasseId(request);
    }
}
