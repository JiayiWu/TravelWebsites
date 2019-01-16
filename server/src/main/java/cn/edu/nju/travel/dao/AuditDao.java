package cn.edu.nju.travel.dao;

import cn.edu.nju.travel.entity.AuditEntity;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * Created on 2019/1/14
 */
public interface AuditDao extends PagingAndSortingRepository<AuditEntity, Integer>{

    Iterable<AuditEntity> findAllByActivityIdAndJoinUserId(Integer activityId, Integer userId);

    //todo
    @Modifying
    @Query(value = "UPDATE audit a SET a.state = 3 " +
            "where a.activity_id = :activityId and a.join_user_id = :joinUserId " +
            "and a.state <> 2", nativeQuery = true)
    int updateAuditDelete(@Param("activityId") Integer activityId, @Param("joinUserId") Integer joinUserId);

//    @Modifying
//    @Query("update AuditEntity a SET a.state = :state " +
//            "where a.activity_id = :activityId and a.join_user_id = : joinUserId " +
//            "and a.state = 0")
//    int updateAuditApproveOrRefuse(@Param("activityId") Integer activityId,
//                                   @Param("joinUserId") Integer joinUserId,
//                                   @Param("state") Integer state);
}
