package com.adminJuegos.demo.Controllers;

import com.adminJuegos.demo.Services.PersonaService;
import com.adminJuegos.demo.Entitys.Persona;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.beans.factory.annotation.Value;


import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;

import java.util.Date;
import java.util.Map;
import java.util.Collections;
import org.springframework.web.bind.annotation.*;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@RestController
public class AuthController {

    private PersonaService servicioPersona;

    @Value("${jwt.secret}")
    private String SECRET_KEY   ;

    @PostMapping("/auth/google")
    public ResponseEntity<?> authGoogle(@RequestBody Map<String, String> body) {
        try {
            String idTokenString = body.get("credential");
            GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier
                    .Builder(GoogleNetHttpTransport.newTrustedTransport(), JacksonFactory.getDefaultInstance())
                    .setAudience(Collections.singletonList("TU_CLIENT_ID"))
                    .build();

            GoogleIdToken idToken = verifier.verify(idTokenString);
            if (idToken != null) {
                GoogleIdToken.Payload payload = idToken.getPayload();
                String email = payload.getEmail();

                // SOLO login: buscar usuario - no crear.
                Persona persona = servicioPersona.getPersonaPorMail(email);

                if (persona != null) {
                    // Genera tu propio JWT (ajusta según tu método real)
                    String token = generarToken(persona.getId());
                    return ResponseEntity.ok(Map.of("token", token));
                } else {
                    // Usuario no existe
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "Usuario no registrado"));
                }
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Token de Google inválido"));
            }
        } catch (Exception e) {
            String error = (e.getMessage() != null) ? e.getMessage() : "Error desconocido (STRING HARDCODEADO)";
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", error));
        }
    }

    private String generarToken(int personaId) {
        return Jwts.builder()
                .claim("userId", personaId)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 86400000)) // 1 día
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY.getBytes())
                .compact();
    }

    @PostMapping("/auth/google-register")
    public ResponseEntity<?> registerGoogle(@RequestBody Map<String, String> body) {
        try {
            String idTokenString = body.get("credential");
            GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier
                    .Builder(GoogleNetHttpTransport.newTrustedTransport(), JacksonFactory.getDefaultInstance())
                    .setAudience(Collections.singletonList("248141265838-c86ptjkolt2bp9h7sargs500kg0coitq.apps.googleusercontent.com"))
                    .build();
            GoogleIdToken idToken = verifier.verify(idTokenString);
            if (idToken != null) {
                GoogleIdToken.Payload payload = idToken.getPayload();
                String email = payload.getEmail();

                // Revisa si existe la persona:
                Persona persona = servicioPersona.getPersonaPorMail(email);

                if (persona != null) {
                    // Ya existe, error de registro
                    return ResponseEntity.status(HttpStatus.CONFLICT)
                            .body(Map.of("error", "El usuario ya existe, usa el login"));
                } else {
                    // No existe: creamos la persona
                    persona = new Persona(email,"google", (String) payload.get("sub"));
                    servicioPersona.Registrar(persona);

                    // Generá tu JWT propio si querés autenticar al registrar
                    String token = generarToken(persona.getId());
                    return ResponseEntity.ok(Map.of("token", token));
                }
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of("error", "Token de Google inválido"));
            }
        } catch (Exception e) {
            String error = (e.getMessage() != null) ? e.getMessage() : "Error desconocido";
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", error));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<Integer> logIn(@RequestBody UserRequest Body) {
        String mail = Body.getMail();
        String password = Body.getPassword();

        try {
            if (servicioPersona.findByMail(mail) == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null); // 404
            }
            Persona p= servicioPersona.LogIn(mail, password);
            if (p==null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null); // 401
            }
            return ResponseEntity.status(HttpStatus.OK).body(p.getId()); // 204
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build().ok(null); // 500
        }
    }

    @PostMapping("/SignIn")
    public ResponseEntity<Void> registrar(@RequestBody UserRequest Body) {
        String mail = Body.getMail();
        String password = Body.getPassword();
        try {
            Persona p = this.servicioPersona.findByMail(mail);
            if (p != null) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
            }
            this.servicioPersona.Registrar(new Persona(mail, password));
            return ResponseEntity.status(HttpStatus.CREATED).body(null);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build().ok(null);
        }
    }


}
