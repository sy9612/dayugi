package com.ssafy.dayugi.repository;

import com.ssafy.dayugi.model.entity.EmotionRate;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmotionRateRepository extends JpaRepository<EmotionRate, Long> {
    public int deleteEmotionRateByDiary_Did(int did);
}
