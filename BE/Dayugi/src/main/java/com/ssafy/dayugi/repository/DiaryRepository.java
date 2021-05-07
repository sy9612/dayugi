package com.ssafy.dayugi.repository;

import com.ssafy.dayugi.model.entity.Diary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface DiaryRepository extends JpaRepository<Diary, Long> {
    public Optional<Diary> findDiaryByDid(int did);//did에 해당하는 다이어리 찾기
    //    @EntityGraph(value = "User.uid", type = EntityGraph.EntityGraphType.FETCH)
    public List<Optional<Diary>> findDiariesByUser_Uid(int uid);//사용자가 작성한 다이어리 전체 조회
    @Query(value = "select * from diary where uid= :uid and YEAR(diary_date) = :year and MONTH(diary_date) = :month", nativeQuery = true)
    public List<Optional<Diary>> findByUserAndDate(@Param("uid") int uid, @Param("year")  int year, @Param("month")  int month);//uid, year, month 일치하는 다이어리 전체 조회
    @Transactional
    public int deleteDiaryByDid(int did);//다이어리 한 개 삭제
    @Transactional
    public int deleteDiariesByUser_Uid(int uid);//사용자가 작성한 다이어리 전체 삭제
    @Query(value = "select * from diary where uid= :uid and diary_date = :diary_date", nativeQuery = true)
    public int findDiaryByUidAndDate(@Param("uid") int uid, @Param("diary_date")  Date diary_date);//did 찾기

}
