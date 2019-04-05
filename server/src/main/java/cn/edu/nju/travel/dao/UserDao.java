package cn.edu.nju.travel.dao;

import cn.edu.nju.travel.entity.UserEntity;
import java.util.List;
import org.apache.catalina.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

/**
 * Created on 2019/1/14
 */
public interface UserDao extends PagingAndSortingRepository<UserEntity, Integer> {

    UserEntity findByName(String name);

    UserEntity findByNameAndPassword(String name, String password);

    UserEntity findById(int id);

    @Query(nativeQuery = true, value = "SELECT * from user u "
            + "WHERE u.id > :lastId AND (u.name LIKE :keyword OR u.mobile LIKE :keyword) "
            + "LIMIT :size")
    List<UserEntity> findUsersWithKeyword(@Param("keyword") String keyword, @Param("size") int size,
            @Param("lastId") int lastId);

}
