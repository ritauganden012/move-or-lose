# move-or-lose
 More-or-Lose is a data storytelling project built with SvelteKit and D3, uncovering how corporate landlords shape eviction trends across Boston through interactive visuals and neighborhood-level analysis.


## Data notes (Shih-Lun)
- `analysis_fp_evict.ipynb`: data processing notebook
- `data_csv/evict_orig.csv`: original dataset (found at https://drive.google.com/drive/folders/1NTbJ3UUFUBqPu3UmKKflUaKAJ9JfFKc9)
- `data_csv/evict_processed.csv`: processed data (what we'll use for our visualization)
- `data_csv/evict_correlation_matrix.csv`: Spearman correlation between key variables
- `data_csv/evict_neighborhoods.csv`: GEOID to neighborhood mappings (to be filled)

The following is a guide on what to show from `data_csv/evict_processed.csv`
### For base choropleth maps
- Eviction filing rate
  - `eviction_rate`: computed from `2023_eviction` and renter household count
- Corp ownership rate
  - `corp_own_rate`
- Race
  - `non_white_rate`: percentage of non-white populations
- Income
  - `r_mhi`: renter median income
  - `mhi`: median income of both renters and owners (can use either this or `r_mhi`) 

### For hover tooltips
- Eviction filing rate
  - `2020_eviction` ... `2023_eviction`: **line plot** to show the trend from 2020 to 2023
- Corp ownership rate
  - `corp_own_rate`: not sure how to be informative/creative here, maybe just display the percentage(?)
- Race
  - `white_rate`, `black_rate`, `hispanic_rate`, `asian_rate`, `othr_race_rate`: **bar plot** to show racial makeup
- Income
  - `r_mhi`, `mhi`, `o_mhi` (owner median income): display these three in juxtaposition (to show that renters earn relatively less)

### For detailed info pane
- headline message: **Out of {xxx} renter households {yyy} ({zz%}) were faced with evictions** (in 2023)
  - use `r_hh` (renter households), `2023_eviction` and `eviction_rate`
- show the line plot for 2020-2023 eviction trend and bar plot for racial makeup
- display the rankings (ranked barplots w/ this particular census tract highlighted) for the 4 key variables
  - `rank_eviction_rate`, `rank_corp_own_rate`, `rank_non_white_rate`, `rank_r_mhi` 
