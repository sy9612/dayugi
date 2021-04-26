package com.ssafy.dayugi.repository;

import com.ssafy.dayugi.model.entity.Diary;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DiaryRepository extends JpaRepository<Diary, Long> {
    public int deleteDiaryBy;
    public int deleteDiariesBy;


}
