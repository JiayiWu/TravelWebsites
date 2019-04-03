package cn.edu.nju.travel.dao;

import cn.edu.nju.travel.entity.ConcernEntity;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 * Created on 2019/4/3
 */
public interface ConcernDao extends JpaRepository<ConcernEntity, Integer> {

    List<ConcernEntity> findByUserId(int userId);

    ConcernEntity findByUserIdAndConcernedId(int userId, int concernedId);

    @Query(nativeQuery = true, value = "SELECT c.concerned_user_id FROM concern c "
            + "where c.user_id = :userId LIMIT :size")
    List<Integer> findConcernedUserIdsFirstPage(@Param("userId")int userId, @Param("size") int size);

    @Query(nativeQuery = true, value = "SELECT cc.concerned_user_id FROM concern cc, "
            + "(SELECT max(c.id) AS id  FROM concern c "
                + "WHERE c.user_id=:userId AND c.concerned_user_id=:lastUserId) lastId "
            + "WHERE cc.user_id=:userId AND cc.id > lastId.id "
            + "LIMIT :size")
    List<Integer> findConcernedUserIds(@Param("userId") int userId, @Param("size") int size,
            @Param("lastUserId") int lastUserId);
}
