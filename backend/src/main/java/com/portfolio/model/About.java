package com.portfolio.model;

import java.util.List;

// Model que representa o "Perfil" do desenvolvedor (como o perfil de um artista no Spotify)
public class About {

    private String name;        // Seu nome
    private String role;        // Cargo/função (ex: "Desenvolvedor Java Backend")
    private String bio;         // Sobre você
    private String location;    // Cidade, País
    private String email;       // Email de contato
    private String githubUrl;   // Link do GitHub
    private String linkedinUrl; // Link do LinkedIn
    private List<String> currentlyPlaying; // O que você está aprendendo agora

    public About(String name, String role, String bio, String location,
                 String email, String githubUrl, String linkedinUrl,
                 List<String> currentlyPlaying) {
        this.name = name;
        this.role = role;
        this.bio = bio;
        this.location = location;
        this.email = email;
        this.githubUrl = githubUrl;
        this.linkedinUrl = linkedinUrl;
        this.currentlyPlaying = currentlyPlaying;
    }

    public String getName() { return name; }
    public String getRole() { return role; }
    public String getBio() { return bio; }
    public String getLocation() { return location; }
    public String getEmail() { return email; }
    public String getGithubUrl() { return githubUrl; }
    public String getLinkedinUrl() { return linkedinUrl; }
    public List<String> getCurrentlyPlaying() { return currentlyPlaying; }
}
