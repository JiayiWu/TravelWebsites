package cn.edu.nju.travel.service.impl;

import cn.edu.nju.travel.dao.BlogDao;
import cn.edu.nju.travel.entity.BlogEntity;
import cn.edu.nju.travel.form.BlogForm;
import cn.edu.nju.travel.form.ResponseCode;
import cn.edu.nju.travel.service.BlogService;
import cn.edu.nju.travel.utils.ServerException;
import cn.edu.nju.travel.vo.BlogVO;
import cn.edu.nju.travel.vo.BlogVOWrapper;
import java.sql.Timestamp;
import java.util.List;
import java.util.stream.Collectors;
import javax.annotation.Resource;
import org.springframework.stereotype.Service;

/**
 * Created on 2019/4/5
 */
@Service
public class BlogServiceImpl implements BlogService{

    @Resource
    BlogDao blogDao;
    @Resource
    BlogVOWrapper blogVOWrapper;

    @Override
    public BlogVO releaseBlog(int userId, BlogForm blogForm) {
        BlogEntity blogEntity = new BlogEntity();
        blogEntity.setUserId(userId);
        blogEntity.setContent(blogForm.getContent());
        blogEntity.setPhotos(blogForm.getPhotos());
        blogEntity = blogDao.save(blogEntity);
        return blogVOWrapper.wrapEntity2VO(blogEntity);
    }

    @Override
    public void deleteBlog(int userId, int id) {
        BlogEntity blogEntity = blogDao.findByIdAndUserId(id, userId);
        if(blogEntity == null){
            throw new ServerException(ResponseCode.Error, "该朋友圈已删除或您无权删除该朋友圈");
        }
        blogDao.deleteById(id);
    }

    @Override
    public List<BlogVO> getUserBlogs(int userId, int size, long lastTime) {
        List<BlogEntity> blogEntities = blogDao.findOneUserBlogs(userId, size, new Timestamp(lastTime));
        return blogEntities.stream().map(entity -> blogVOWrapper.wrapEntity2VO(entity)).collect(
                Collectors.toList());
    }

    @Override
    public List<BlogVO> getConcernUsersBlogs(int userId, int size, long lastTime) {
        List<BlogEntity> blogEntities = blogDao.findConcernedUserBlogs(userId, size, new
                Timestamp(lastTime));
        return blogEntities.stream().map(entity -> blogVOWrapper.wrapEntity2VO(entity)).collect(
                Collectors.toList());
    }

    @Override
    public boolean isUserBlog(int userId, int blogId) {
        return blogDao.findByIdAndUserId(blogId, userId)!=null;
    }
}
