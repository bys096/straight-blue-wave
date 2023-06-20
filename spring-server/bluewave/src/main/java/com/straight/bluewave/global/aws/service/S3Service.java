package com.straight.bluewave.global.aws.service;

import com.amazonaws.HttpMethod;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.Headers;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.GeneratePresignedUrlRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.Serializable;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@RequiredArgsConstructor
@Service
@Slf4j
public class S3Service {

    // service
    private final AmazonS3 amazonS3;

    private String useOnlyOneFileName;
    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    @Value("${cloud.aws.region.static}")
    private String location;

    public Map<String, Serializable> getPreSignedUrl(String prefix, String fileName) {

        String onlyOneFileName = onlyOneFileName(fileName);

        useOnlyOneFileName = onlyOneFileName;

        if (!prefix.equals("")) {
            onlyOneFileName = prefix + "/" + onlyOneFileName;
        }
        GeneratePresignedUrlRequest generatePresignedUrlRequest = getGeneratePreSignedUrlRequest(bucket, onlyOneFileName);

        Map<String, Serializable> result = new HashMap<>();
        result.put("preSignedUrl", amazonS3.generatePresignedUrl(generatePresignedUrlRequest).toString());
        result.put("encodedFileName", useOnlyOneFileName);


        return result;
    }

    private GeneratePresignedUrlRequest getGeneratePreSignedUrlRequest(String bucket, String fileName) {
        GeneratePresignedUrlRequest generatePresignedUrlRequest =
                new GeneratePresignedUrlRequest(bucket, fileName)
                        .withMethod(HttpMethod.PUT);
//                        .withExpiration(getPreSignedUrlExpiration());
        generatePresignedUrlRequest.addRequestParameter(
                Headers.S3_CANNED_ACL,
                CannedAccessControlList.PublicRead.toString());
        return generatePresignedUrlRequest;
    }

    private Date getPreSignedUrlExpiration() {
        Date expiration = new Date();
        long expTimeMillis = expiration.getTime();
        expTimeMillis += 1000 * 60 * 2;
        expiration.setTime(expTimeMillis);
        log.info(expiration.toString());
        return expiration;
    }

    private String onlyOneFileName(String filename){
        return UUID.randomUUID().toString()+filename;

    }

    public String findByName(String path) {
        log.info("Generating signed URL for file name {}", useOnlyOneFileName);
        return "https://"+bucket+".s3."+location+".amazonaws.com/"+path+"/"+useOnlyOneFileName;
    }
}
