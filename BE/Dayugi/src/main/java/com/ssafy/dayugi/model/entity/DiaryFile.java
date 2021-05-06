package com.ssafy.dayugi.model.entity;

import com.sun.istack.NotNull;
import lombok.Data;
import javax.persistence.*;


@Data
@Entity
public class DiaryFile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int fid;

    @ManyToOne
    @JoinColumn(name = "did")
    private Diary diary;

    @NotNull
    private String fileName;
    @NotNull
    private String fileOrigName;
    @NotNull
    private String filePath;
}
