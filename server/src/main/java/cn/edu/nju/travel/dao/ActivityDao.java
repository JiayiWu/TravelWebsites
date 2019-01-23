package cn.edu.nju.travel.dao;

import cn.edu.nju.travel.entity.ActivityEntity;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import java.sql.Timestamp;
import java.util.List;

/**
 * Created on 2019/1/13
 */
public interface ActivityDao extends PagingAndSortingRepository<ActivityEntity, Integer>{

    @Modifying
    @Query(nativeQuery = true,value = "update activity a set a.location = :location, a.title = :title, a.start_time = :startTime, a.end_time = :endTime," +
            " a.cover_url = :coverUrl, a.join_type = :joinType, a.description = :description " +
            "where a.id = :id")
    void updateActivityInfo(@Param("id") Integer id,
                           @Param("location") String location,
                           @Param("title") String title,
                           @Param("startTime") Timestamp startTime,
                           @Param("endTime") Timestamp endTime,
                           @Param("joinType") Integer joinType,
                           @Param("coverUrl") String coverUrl,
                           @Param("description") String description);

    @Modifying
    @Query(nativeQuery = true, value = "select * from activity a where a.start_time > :lastTimestamp and a.state = 1 order by start_time,id limit :thesize ")
    List<ActivityEntity> getActivityList(@Param("lastTimestamp") Timestamp lastTimeStamp, @Param("thesize") Integer thesize);

    @Modifying
    @Query("update ActivityEntity a set a.state = :result where a.id = :activityId")
    void updateActivityStateValidOrInvalid(@Param("activityId") Integer activityId,
                                           @Param("result") Integer result);
}
