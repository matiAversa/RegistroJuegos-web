package com.adminJuegos.demo.Controllers;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

import com.adminJuegos.demo.Services.JuegoService;
import com.adminJuegos.demo.Services.PersonaService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.graphql.GraphQlProperties;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;

import com.adminJuegos.demo.Entitys.*;
import com.adminJuegos.demo.Controllers.JuegoController;
import com.adminJuegos.demo.Services.JuegoJugadoService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class JuegosJugadosController {

    JuegoJugadoService servicioJJ;
    PersonaService ServicePersona;
    JuegoService ServiceJuego;

    @Value("${jwt.secret}")
    private String SECRET_KEY;

    @Autowired
    public JuegosJugadosController (JuegoJugadoService servicioJJ, PersonaService ServicePersona, JuegoService ServiceJuego) {
         this.servicioJJ=servicioJJ;
         this.ServicePersona = ServicePersona;
         this.ServiceJuego = ServiceJuego;
    }

    @GetMapping("/JuegosSinCalificar")
    public ResponseEntity<List<DataJuegoSinJugar>> getJuegosSinJugar (@RequestHeader("Authorization") String token){
        try {
            if (token.startsWith("Bearer ")) {
                token = token.substring(7);
            }
            Claims claims = Jwts.parser()
                    .setSigningKey(SECRET_KEY.getBytes()) // Importante usar el mismo encoding
                    .parseClaimsJws(token)
                    .getBody();
            Integer id = claims.get("userId", Integer.class);

            return ResponseEntity.ok(servicioJJ.getJuegosNoJugadosPorPersona(id));
        } catch (Exception ex) {
            System.out.println(ex.getMessage());
            return ResponseEntity.internalServerError().body(null);
        }
    }

    @GetMapping("/JuegosJugados")
    public ResponseEntity<List<DataJuegoJugado>> getJuegosJugados(@RequestParam("userId") Integer userId) {
        try {
            List<DataJuegoJugado> listajuegos = servicioJJ.getJuegosJugados(ServicePersona.findById(userId));
            if (listajuegos != null && !listajuegos.isEmpty()) {
                return ResponseEntity.status(HttpStatus.OK).body(listajuegos);
            }
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PostMapping("/EliminarJuegoJugado")
    public ResponseEntity<Void> eliminarJuegoJugado (@RequestBody Map<String, String> body){

        try{
            String idPersona = body.get("IdPersona");
            String idJuego = body.get("IdJuego");

            Integer idP = Integer.valueOf(idPersona);
            Integer idJ = Integer.valueOf(idJuego);

            boolean delete = this.servicioJJ.DeleteJuegoJugado(idP,idJ);

            if (delete){
                return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
            }else{
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }

        }catch(Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

    }
    @PostMapping("/nuevoJuegoJugado")
    public void addJuegoJugado (@RequestBody Map<String, String> body, @RequestHeader("Authorization") String token){

        if (token.startsWith("Bearer ")) {
            token = token.substring(7);
        }
        Claims claims = Jwts.parser()
                .setSigningKey(SECRET_KEY.getBytes()) // Importante usar el mismo encoding
                .parseClaimsJws(token)
                .getBody();
        Integer idPersona = claims.get("userId", Integer.class);


        int idJuego = Integer.valueOf(body.get("juegoId"));
        int calificacion = Integer.valueOf(body.get("calificacion"));
        String descripcion = body.get("descripcion");
        this.servicioJJ.saveJuegoJugado(ServicePersona.findById(idPersona), ServiceJuego.findById(idJuego), calificacion, descripcion);

    }
}
