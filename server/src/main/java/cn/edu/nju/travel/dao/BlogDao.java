package cn.edu.nju.travel.dao;

import cn.edu.nju.travel.entity.BlogEntity;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created on 2019/4/5
 */
public interface BlogDao extends JpaRepository<BlogEntity, Integer>{

    List<BlogEntity> findByUserId(int userId);
}
