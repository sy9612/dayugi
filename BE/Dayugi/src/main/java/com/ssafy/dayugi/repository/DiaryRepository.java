package com.ssafy.dayugi.repository;

import com.ssafy.dayugi.model.entity.Diary;
import com.ssafy.dayugi.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface DiaryRepository extends JpaRepository<Diary, User, Long> {
    public Optional<Diary> findDiaryByDid(int did);//did에 해당하는 다이어리 찾기
    public List<Optional<Diary>> findDiariesByUid(int uid);//사용자가 작성한 다이어리 전체 조회
    @Query(value = "select * from diary where uid= :uid and YEAR(diary_date) = :year and MONTH(diary_date) = :month", nativeQuery = true)
    public List<Optional<Diary>> findByUserAndDate(@Param("uid") int uid, @Param("year")  int year, @Param("month")  int month);//uid, year, month 일치하는 다이어리 전체 조회
    public int deleteDiaryByDid(int did);//다이어리 한 개 삭제
    public int deleteDiariesByUid(int uid);//사용자가 작성한 다이어리 전체 삭제
}
