package cn.edu.nju.travel.vo;

import cn.edu.nju.travel.dao.BlogDao;
import cn.edu.nju.travel.dao.UserDao;
import cn.edu.nju.travel.entity.BlogEntity;
import cn.edu.nju.travel.entity.UserEntity;
import cn.edu.nju.travel.service.BlogService;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import javax.annotation.Resource;
import org.springframework.stereotype.Component;

/**
 * Created on 2019/4/5
 */
@Component
public class BlogVOWrapper {

    @Resource
    UserDao userDao;
    @Resource
    BlogDao blogDao;

    public BlogVO wrapEntity2VO(BlogEntity entity){
        BlogVO vo = new BlogVO();
        vo.setId(entity.getId());
        vo.setContent(entity.getContent());
        vo.setCreateTime(entity.getCreateTime().getTime());
        vo.setLikeCount(entity.getLikeCount());
        String photoStr = entity.getPhotos();
        vo.setPhotos(photoStr==null||photoStr.isEmpty()?new ArrayList<>():Arrays.asList(photoStr
                .split(",")));
        vo.setUserId(entity.getUserId());
        UserEntity userEntity = userDao.findById(entity.getUserId());
        vo.setUserAvatar(userEntity.getLogoUrl());
        vo.setUserName(userEntity.getName());
        return vo;
    }

    public BlogVO wrapVOWithSelfInfo(Integer userId, BlogVO vo){
        if(userId != null){
            vo.setMyself(blogDao.findByIdAndUserId(vo.getId(), userId)!=null);
        }
        return vo;
    }

    public List<BlogVO> wrapListWithSelfInfo(Integer userId, List<BlogVO> voList){
        voList.forEach(vo->wrapVOWithSelfInfo(userId, vo));
        return voList;
    }

}
