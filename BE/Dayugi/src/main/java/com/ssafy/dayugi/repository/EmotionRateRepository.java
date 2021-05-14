package com.ssafy.dayugi.repository;

import org.springframework.data.jpa.repository.JpaRepository;

public interface EmotionRateRepository extends JpaRepository<EmotionRate, Long> {
    public int deleteEmotionRateByDiary_Did(int did);
}