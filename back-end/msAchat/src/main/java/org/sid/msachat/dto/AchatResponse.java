package org.sid.msachat.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AchatResponse {
    private Long id;
    private LocalDate date;
    private List<Long> products;
    private String currency;
    private double total;
}
