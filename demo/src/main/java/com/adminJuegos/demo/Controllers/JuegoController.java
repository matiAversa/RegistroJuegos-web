package com.adminJuegos.demo.Controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.adminJuegos.demo.Entitys.DataJuegoSinJugar;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import com.adminJuegos.demo.Entitys.Juego;
import com.adminJuegos.demo.Services.JuegoService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class JuegoController {
    
    JuegoService servicioJuego;

    @Value("${jwt.secret}")
    private String SECRET_KEY;

    @Autowired
    public JuegoController(JuegoService servicioJuego) {
        this.servicioJuego = servicioJuego;
    }

    @PostMapping("/RecomendarJuego")
    public ResponseEntity<?> RecomendarJuego(@RequestHeader ("Authorization") String token, @RequestBody Map<String,String> body){
        try {
            if (token.startsWith("Bearer ")) {
                token = token.substring(7);
            }
            Claims claims = Jwts.parser()
                    .setSigningKey(SECRET_KEY.getBytes()) // Importante usar el mismo encoding
                    .parseClaimsJws(token)
                    .getBody();
            Integer id = claims.get("userId", Integer.class);

            String recomendado = body.get("recomendado");

            boolean esta = servicioJuego.estaRecomendado(recomendado);
            if (esta) {
                return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
            } else {
                return ResponseEntity.status(HttpStatus.CONFLICT).build();
            }
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    public Juego getJuegoPorNombre (String nombre){
        return servicioJuego.findByNombre(nombre);
    }

    public Juego getPorId (Integer id){
        return servicioJuego.findById(id);
    }


}