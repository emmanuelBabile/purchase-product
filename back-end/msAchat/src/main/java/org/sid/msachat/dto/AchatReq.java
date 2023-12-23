package org.sid.msachat.dto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.util.List;
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AchatReq {
    @DateTimeFormat(pattern = "YYYY-MM-DD")
    private LocalDate date;
    private List<Long> products;
    private String currency;
}
