package cn.edu.nju.travel.utils;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import org.apache.commons.codec.binary.Base64;

/**
 * Created on 2019/1/14
 */
public class MD5Encryption {

    public static String encrypt(String word) throws NoSuchAlgorithmException {
        MessageDigest md = MessageDigest.getInstance("MD5");
        byte[] input = word.getBytes();
        byte[] output = md.digest(input);
        return Base64.encodeBase64String(output);
    }

}
