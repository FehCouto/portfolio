package com.portfolio.model;

// Model que representa uma habilidade técnica (como um "Artista" no Spotify)
public class Skill {

    private String name;     // Nome da tecnologia (ex: "Java")
    private int level;       // Nível de 0 a 100 (como uma barra de progresso)
    private String category; // Categoria (ex: "Backend", "Frontend", "DevOps")
    private String icon;     // Nome do ícone (usaremos devicons no frontend)

    public Skill(String name, int level, String category, String icon) {
        this.name = name;
        this.level = level;
        this.category = category;
        this.icon = icon;
    }

    public String getName() { return name; }
    public int getLevel() { return level; }
    public String getCategory() { return category; }
    public String getIcon() { return icon; }
}
