package com.portfolio.model;

// Esta é uma classe "Model" — ela representa um Projeto do portfólio.
// Em Java, uma classe é como um molde/template para criar objetos.
public class Project {

    // Atributos (os dados que cada projeto tem)
    private String id;
    private String title;       // Nome do projeto (ex: "Sistema de Cadastro")
    private String description; // Descrição do projeto
    private String techStack;   // Tecnologias usadas (ex: "Java, Spring Boot")
    private String githubUrl;   // Link do GitHub
    private String imageUrl;    // URL da imagem/capa do projeto
    private String category;    // Categoria (ex: "Backend", "FullStack")

    // Construtor: método especial chamado quando criamos um novo Project
    // É como preencher o formulário de um novo projeto
    public Project(String id, String title, String description,
                   String techStack, String githubUrl, String imageUrl, String category) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.techStack = techStack;
        this.githubUrl = githubUrl;
        this.imageUrl = imageUrl;
        this.category = category;
    }

    // Getters: métodos para ler os valores dos atributos.
    // O Spring usa esses métodos para converter o objeto em JSON automaticamente.
    public String getId() { return id; }
    public String getTitle() { return title; }
    public String getDescription() { return description; }
    public String getTechStack() { return techStack; }
    public String getGithubUrl() { return githubUrl; }
    public String getImageUrl() { return imageUrl; }
    public String getCategory() { return category; }
}
