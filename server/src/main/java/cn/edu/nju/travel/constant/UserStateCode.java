package cn.edu.nju.travel.constant;

/**
 * Created by Jiayiwu on 19/1/12.
 * Mail:wujiayi@lgdreamer.com
 * Change everywhere
 */
public enum  UserStateCode {
    CERTIFIED(0,"已经认证"),UNCERTIFIED(1,"未认证");

    private final String value;
    private final int index;

    UserStateCode(int index, String value){
        this.index = index;
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    public int getIndex() {
        return index;
    }
}
