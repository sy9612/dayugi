package com.ssafy.dayugi.model.entity;

import lombok.Data;
import lombok.NonNull;

import javax.persistence.*;

@Data
@Entity
public class EmotionRate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="erid")
    private int erid;

    @ManyToOne
    @JoinColumn(name = "did")
    private Diary diary;

    @NonNull
    private String happiness;

    @NonNull
    private String angry;

    @NonNull
    private String disgust;

    @NonNull
    private String fear;

    @NonNull
    private String neutral;

    @NonNull
    private String sadness;

    @NonNull
    private String surprise;

}
