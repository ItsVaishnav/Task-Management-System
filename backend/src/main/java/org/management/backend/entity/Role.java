package org.management.backend.entity;

import jakarta.persistence.*;

import java.util.Set;

@Entity
@Table(name="roles")
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private String name;

    // Relationships
    @OneToMany(mappedBy = "role", cascade = CascadeType.ALL)
    private Set<UserRole> userRoles;


    public String getRollName() {
        return name;
    }

    public void setRollName(String rollName) {
        this.name = rollName;
    }

    public int getR_id() {
        return id;
    }

    public void setR_id(int r_id) {
        id = r_id;
    }
}
