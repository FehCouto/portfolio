package com.portfolio.controller;

import com.portfolio.model.About;
import com.portfolio.model.Project;
import com.portfolio.model.Skill;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;

// @RestController diz ao Spring: "esta classe responde requisições HTTP e retorna JSON"
// @RequestMapping define o caminho base para todos os endpoints desta classe
@RestController
@RequestMapping("/api")
// @CrossOrigin permite que o frontend (em outro domínio/porta) acesse esta API
// Em produção, substitua "*" pelo domínio real do seu frontend
@CrossOrigin(origins = "*")
public class PortfolioController {

    // =========================================================
    // ENDPOINT: GET /api/projects
    // Retorna todos os projetos como uma lista JSON
    // =========================================================
    @GetMapping("/projects")
    public List<Project> getProjects() {
        // Por enquanto os dados ficam aqui no código (hardcoded).
        // Mais pra frente podemos conectar um banco de dados.
        return Arrays.asList(
            new Project(
                "1",
                "Portfolio Spotify",
                "Portfólio pessoal com tema visual inspirado no Spotify. Backend em Java Spring Boot e frontend em HTML/CSS/JS puro.",
                "Java, Spring Boot, HTML, CSS, JavaScript, Docker",
                "https://github.com/seu-usuario/portfolio",
                "https://via.placeholder.com/300x300/1DB954/FFFFFF?text=Portfolio",
                "FullStack"
            ),
            new Project(
                "2",
                "API de Cadastro",
                "API REST para gerenciamento de usuários com operações CRUD completas.",
                "Java, Spring Boot, PostgreSQL",
                "https://github.com/seu-usuario/api-cadastro",
                "https://via.placeholder.com/300x300/1DB954/FFFFFF?text=API",
                "Backend"
            ),
            new Project(
                "3",
                "Em Breve...",
                "Próximo projeto está sendo desenvolvido. Fique ligado!",
                "Java, Spring Boot",
                "#",
                "https://via.placeholder.com/300x300/282828/1DB954?text=...",
                "Backend"
            )
        );
    }

    // =========================================================
    // ENDPOINT: GET /api/skills
    // Retorna as habilidades técnicas
    // =========================================================
    @GetMapping("/skills")
    public List<Skill> getSkills() {
        return Arrays.asList(
            // Backend
            new Skill("Java",        70, "Backend", "java"),
            new Skill("Spring Boot", 60, "Backend", "spring"),

            // Frontend
            new Skill("HTML",        80, "Frontend", "html5"),
            new Skill("CSS",         75, "Frontend", "css3"),
            new Skill("JavaScript",  70, "Frontend", "javascript"),

            // DevOps
            new Skill("Docker",      55, "DevOps", "docker"),
            new Skill("Git",         75, "DevOps", "git")
        );
    }

    // =========================================================
    // ENDPOINT: GET /api/about
    // Retorna informações do desenvolvedor
    // =========================================================
    @GetMapping("/about")
    public About getAbout() {
        return new About(
            "Felipe Couto",                          // <- EDITE AQUI
            "Desenvolvedor Java Backend",         // <- EDITE AQUI
            "Apaixonado por tecnologia e código limpo. " +
            "Atualmente aprendendo Java e construindo projetos reais " +
            "para consolidar o conhecimento.",
            "Brasil",                             // <- EDITE AQUI
            "fehlipecouto22@email.com",                 // <- EDITE AQUI
            "https://github.com/FehCouto",     // <- EDITE AQUI
            "https://linkedin.com/in/felipeguimaraescouto", // <- EDITE AQUI
            Arrays.asList("Java", "Spring Boot", "Docker", "Clean Code")
        );
    }
}
