package cn.edu.nju.travel.dao;

import cn.edu.nju.travel.entity.UserEntity;
import org.apache.catalina.User;
import org.springframework.data.repository.PagingAndSortingRepository;

/**
 * Created on 2019/1/14
 */
public interface UserDao extends PagingAndSortingRepository<UserEntity, Integer> {

    UserEntity findByName(String name);

    UserEntity findByNameAndPassword(String name, String password);

    UserEntity findById(int id);

}
