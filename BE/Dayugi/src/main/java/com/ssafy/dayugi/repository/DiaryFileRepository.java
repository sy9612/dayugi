package com.ssafy.dayugi.repository;

import com.ssafy.dayugi.model.entity.DiaryFile;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface DiaryFileRepository extends JpaRepository<DiaryFile, Long> {
    public List<DiaryFile> findDiaryFilesByDiary_Did(int did);
}
