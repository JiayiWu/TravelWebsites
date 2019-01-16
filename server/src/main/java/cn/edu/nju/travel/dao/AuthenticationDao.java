package cn.edu.nju.travel.dao;

import cn.edu.nju.travel.entity.AuthenticationEntity;
import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

/**
 * Created on 2019/1/14
 */
public interface AuthenticationDao extends PagingAndSortingRepository<AuthenticationEntity,
        Integer>{

    AuthenticationEntity findByUserId(int userId);

    @Query(value = "SELECT * FROM authentication a WHERE a.id > :id AND a.state=:state ORDER BY a"
            + ".id ASC LIMIT :pageSize",nativeQuery = true)
    List<AuthenticationEntity> findNextAuthListByState(@Param("id")int id, @Param("state")int
            state, @Param("pageSize") int pageSize);

    @Query(value = "SELECT * FROM authentication a WHERE a.id > :id ORDER BY a"
            + ".id ASC LIMIT :pageSize",nativeQuery = true)
    List<AuthenticationEntity> findNextAuthListAll(@Param("id")int id, @Param("pageSize") int pageSize);

}
