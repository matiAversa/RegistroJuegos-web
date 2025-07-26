package com.adminJuegos.demo.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.adminJuegos.demo.Entitys.Persona;
import com.adminJuegos.demo.Services.PersonaService;

// DTO para recibir los datos del login
class UserRequest {
    private String mail;
    private String password;


    // Getters y setters
    public String getMail() { return mail; }
    public void setMail(String mail) { this.mail = mail; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }


}

@RestController
@RequestMapping("/api")
public class PersonaController {

    private final PersonaService servicioPersona;

    @Autowired
    public PersonaController(PersonaService servicioPersona) {
        this.servicioPersona = servicioPersona;
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


    public Persona findById(Integer id) {
        return servicioPersona.findById(id);
    }

    public Persona findByMail(String mail) {
        return servicioPersona.getPersonaPorMail(mail);
    }

}
