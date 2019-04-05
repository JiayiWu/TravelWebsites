package cn.edu.nju.travel.dao;

import cn.edu.nju.travel.entity.BlogEntity;
import java.sql.Timestamp;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 * Created on 2019/4/5
 */
public interface BlogDao extends JpaRepository<BlogEntity, Integer>{

    BlogEntity findByIdAndUserId(int id, int userId);

    @Query(nativeQuery = true, value = "SELECT * FROM blog b "
            + "WHERE b.user_id=:userId AND b.create_time<:lastTime "
            + "ORDER BY b.create_time DESC LIMIT :size")
    List<BlogEntity> findOneUserBlogs(@Param("userId")int userId, @Param("size") int size,
            @Param("lastTime") Timestamp lastTime);

    @Query(nativeQuery = true, value = "SELECT b.* FROM blog b "
            + "LEFT JOIN concern c on b.user_id = c.concerned_user_id "
            + "WHERE c.user_id = :userId or b.user_id = :userId "
            + "AND b.create_time < :lastTime "
            + "ORDER BY b.create_time DESC LIMIT :size")
    List<BlogEntity> findConcernedUserBlogs(@Param("userId")int userId, @Param("size") int size,
            @Param("lastTime") Timestamp lastTime);
}
