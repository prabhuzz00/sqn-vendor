<Box sx={{ py: { xs: 2, lg: 5 }, bgcolor: '#f5f5f5', minHeight: '100vh' }}>
    <Grid container spacing={3} sx={{ maxWidth: '1400px', mx: 'auto', px: 2 }}>
        {/* Sidebar */}
        <Grid item xs={12} lg={3}>
            <Card sx={{ position: 'sticky', top: 20 }}>
                <CardContent>
                    <Typography variant="h6" gutterBottom color="primary">
                        Account Dashboard
                    </Typography>
                    {/* AccountSidebar component would be here */}
                    <AccountSidebar />
                </CardContent>
            </Card>
        </Grid>

        {/* Main Content */}
        <Grid item xs={12} lg={9}>
            <Card sx={{ mb: 3 }}>
                <CardContent>
                    <Box display="flex" alignItems="center" gap={2} mb={2}>
                        <MdInventory size={24} color="#1976d2" />
                        <Typography variant="h5" fontWeight="600">
                            {isEditMode ? "Edit Product" : "Add New Product"}
                        </Typography>
                    </Box>
                    <Divider />

                    <Box component="form" sx={{ mt: 3 }}>
                        {/* Basic Information Card */}
                        <Card sx={{ mb: 3, border: '1px solid #e0e0e0' }}>
                            <CardContent>
                                <Box display="flex" alignItems="center" gap={1} mb={2}>
                                    <FaBox color="#1976d2" />
                                    <Typography variant="h6" color="primary">Basic Information</Typography>
                                </Box>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={6}>
                                        <FormLabel sx={{ display: 'block', mb: 1, fontWeight: 500 }}>
                                            Product Name *
                                        </FormLabel>
                                        <TextField
                                            variant="outlined"
                                            size="small"
                                            fullWidth
                                            placeholder="Enter product name"
                                            name="name"
                                            value={formFields.name}
                                            onChange={onChangeInput}
                                            disabled={isLoading}
                                        // Add props here
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <FormLabel sx={{ display: 'block', mb: 1, fontWeight: 500 }}>
                                            Arabic Name *
                                        </FormLabel>
                                        <TextField
                                            variant="outlined"
                                            size="small"
                                            fullWidth
                                            placeholder="Enter Arabic name"
                                            name="arbName"
                                            value={formFields.arbName}
                                            onChange={onChangeInput}
                                            disabled={isLoading}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <FormLabel sx={{ display: 'block', mb: 1, fontWeight: 500 }}>
                                            Description *
                                        </FormLabel>
                                        <TextField
                                            variant="outlined"
                                            size="small"
                                            fullWidth
                                            multiline
                                            rows={3}
                                            placeholder="Enter product description"
                                            name="description"
                                            value={formFields.description}
                                            onChange={onChangeInput}
                                            disabled={isLoading}
                                            multiline
                                            rows={4}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <FormLabel sx={{ display: 'block', mb: 1, fontWeight: 500 }}>
                                            Arabic Description *
                                        </FormLabel>
                                        <TextField
                                            variant="outlined"
                                            size="small"
                                            fullWidth
                                            multiline
                                            rows={3}
                                            placeholder="Enter Arabic description"
                                            name="arbDescription"
                                            value={formFields.arbDescription}
                                            onChange={onChangeInput}
                                            disabled={isLoading}
                                            multiline
                                            rows={4}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <FormLabel sx={{ display: 'block', mb: 1, fontWeight: 500 }}>
                                            Brand *
                                        </FormLabel>
                                        <TextField
                                            variant="outlined"
                                            size="small"
                                            fullWidth
                                            placeholder="Enter brand name"
                                            InputProps={{
                                                startAdornment: <MdBrandingWatermark style={{ marginRight: 8, color: '#666' }} />
                                            }}
                                            name="brand"
                                            value={formFields.brand}
                                            onChange={onChangeInput}
                                            disabled={isLoading}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <FormLabel sx={{ display: 'block', mb: 1, fontWeight: 500 }}>
                                            Tags
                                        </FormLabel>
                                        <TextField
                                            variant="outlined"
                                            size="small"
                                            fullWidth
                                            placeholder="Enter tags separated by commas"
                                            InputProps={{
                                                startAdornment: <FaTag style={{ marginRight: 8, color: '#666' }} />
                                            }}
                                            name="tags"
                                            value={formFields.tags.join(", ")}
                                            onChange={onChangeInput}
                                            disabled={isLoading}
                                        // Add props here

                                        />
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>

                        {/* Pricing & Inventory Card */}
                        <Card sx={{ mb: 3, border: '1px solid #e0e0e0' }}>
                            <CardContent>
                                <Box display="flex" alignItems="center" gap={1} mb={2}>
                                    <MdInventory color="#1976d2" />
                                    <Typography variant="h6" color="primary">Pricing & Inventory</Typography>
                                </Box>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={4}>
                                        <FormLabel sx={{ display: 'block', mb: 1, fontWeight: 500 }}>
                                            Price *
                                        </FormLabel>
                                        <TextField
                                            variant="outlined"
                                            size="small"
                                            type="number"
                                            fullWidth
                                            placeholder="0.00"
                                            InputProps={{ startAdornment: <span style={{ marginRight: 4 }}>$</span> }}
                                            name="price"
                                            value={formFields.price}
                                            onChange={onChangeInput}
                                            disabled={isLoading}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <FormLabel sx={{ display: 'block', mb: 1, fontWeight: 500 }}>
                                            Old Price *
                                        </FormLabel>
                                        <TextField
                                            variant="outlined"
                                            size="small"
                                            type="number"
                                            fullWidth
                                            placeholder="0.00"
                                            InputProps={{ startAdornment: <span style={{ marginRight: 4 }}>$</span> }}
                                            name="oldPrice"
                                            value={formFields.oldPrice}
                                            onChange={onChangeInput}
                                            disabled={isLoading}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <FormLabel sx={{ display: 'block', mb: 1, fontWeight: 500 }}>
                                            Discount %
                                        </FormLabel>
                                        <TextField
                                            variant="outlined"
                                            size="small"
                                            type="number"
                                            fullWidth
                                            InputProps={{
                                                readOnly: true,
                                                endAdornment: <span>%</span>
                                            }}
                                            sx={{ '& .MuiInputBase-input': { bgcolor: '#f5f5f5' } }}
                                            name="discount"
                                            value={formFields.discount}
                                            onChange={onChangeInput}
                                            disabled={isLoading}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <FormLabel sx={{ display: 'block', mb: 1, fontWeight: 500 }}>
                                            Stock Quantity *
                                        </FormLabel>
                                        <TextField
                                            variant="outlined"
                                            size="small"
                                            type="number"
                                            fullWidth
                                            placeholder="0"
                                            name="countInStock"
                                            value={formFields.countInStock}
                                            onChange={onChangeInput}
                                            disabled={isLoading}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <FormLabel sx={{ display: 'block', mb: 1, fontWeight: 500 }}>
                                            Rating
                                        </FormLabel>
                                        <Box display="flex" alignItems="center" gap={1}>
                                            <FaStar color="#ff9800" />
                                            <Rating
                                                size="medium"
                                                name="rating"
                                                value={parseFloat(formFields.rating) || 0}
                                                onChange={onChangeRating}
                                                disabled={isLoading}
                                            />
                                        </Box>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>

                        {/* Categories Card */}
                        <Card sx={{ mb: 3, border: '1px solid #e0e0e0' }}>
                            <CardContent>
                                <Box display="flex" alignItems="center" gap={1} mb={2}>
                                    <MdCategory color="#1976d2" />
                                    <Typography variant="h6" color="primary">Categories</Typography>
                                </Box>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={4}>
                                        <FormLabel sx={{ display: 'block', mb: 1, fontWeight: 500 }}>
                                            Main Category *
                                        </FormLabel>
                                        <Select
                                            size="small"
                                            fullWidth
                                            displayEmpty
                                            value={productCat}
                                            onChange={handleChangeProductCat}
                                            disabled={isLoading}
                                        >
                                            {context?.catData?.map((cat) => (
                                                                    <MenuItem key={cat?._id} value={cat?._id}>
                                                                      {cat?.name}
                                                                    </MenuItem>
                                                                  ))}
                                        </Select>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <FormLabel sx={{ display: 'block', mb: 1, fontWeight: 500 }}>
                                            Sub Category
                                        </FormLabel>
                                        <Select
                                            size="small"
                                            fullWidth
                                            displayEmpty
                                            value={productSubCat}
                                            onChange={handleChangeProductSubCat}
                                            disabled={isLoading}
                                        >
                                            {context?.catData
                                                ?.flatMap((cat) => cat?.children)
                                                ?.map((subCat) => (
                                                    <MenuItem key={subCat?._id} value={subCat?._id}>
                                                        {subCat?.name}
                                                    </MenuItem>
                                                ))}
                                        </Select>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <FormLabel sx={{ display: 'block', mb: 1, fontWeight: 500 }}>
                                            Third Level Category
                                        </FormLabel>
                                        <Select
                                            size="small"
                                            fullWidth
                                            displayEmpty
                                            value={productThirdLavelCat}
                                            onChange={handleChangeProductThirdLavelCat}
                                            disabled={isLoading}
                                        >
                                            {context?.catData
                                                ?.flatMap((cat) => cat?.children)
                                                ?.flatMap((subCat) => subCat?.children)
                                                ?.map((thirdLavelCat) => (
                                                    <MenuItem
                                                        key={thirdLavelCat?._id}
                                                        value={thirdLavelCat?._id}
                                                    >
                                                        {thirdLavelCat?.name}
                                                    </MenuItem>
                                                ))}
                                        </Select>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <FormLabel sx={{ display: 'block', mb: 1, fontWeight: 500 }}>
                                            Featured Product
                                        </FormLabel>
                                        <Select
                                            size="small"
                                            fullWidth
                                            value={productFeatured}
                                            onChange={handleChangeProductFeatured}
                                            disabled={isLoading}
                                        >
                                            <MenuItem value={true}>Yes</MenuItem>
                                            <MenuItem value={false}>No</MenuItem>
                                        </Select>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>

                        {/* Product Variations Card */}
                        <Card sx={{ mb: 3, border: '1px solid #e0e0e0' }}>
                            <CardContent>
                                <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                                    <Box display="flex" alignItems="center" gap={1}>
                                        <BsCardImage color="#1976d2" />
                                        <Typography variant="h6" color="primary">Product Variations</Typography>
                                    </Box>
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        startIcon={<IoMdAdd />}
                                        onClick={handleAddVariation}
                                        disabled={isLoading}
                                    >
                                        Add Variation
                                    </Button>
                                </Box>

                                {/* Variation items mapped here */}
                                {variations.map((variation, index) => (
                                    <Paper key={index} sx={{ p: 2, mb: 2, bgcolor: '#fafafa', border: '1px solid #e0e0e0' }}>
                                        <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                                            <Typography variant="subtitle1" fontWeight="500">Variation #{index + 1}</Typography>
                                            <IconButton
                                                size="small"
                                                color="error"
                                                onClick={() => handleRemoveVariation(index)}
                                                disabled={isLoading}
                                            >
                                                <IoMdClose />
                                            </IconButton>
                                        </Box>

                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={6}>
                                                <FormLabel sx={{ display: 'block', mb: 1, fontWeight: 500 }}>
                                                    Color
                                                </FormLabel>
                                                <Select
                                                    size="small"
                                                    fullWidth
                                                    displayEmpty
                                                    value={variation.color.label}
                                                    onChange={(e) =>
                                                        handleVariationChange(index, "label", e.target.value)
                                                    }
                                                    disabled={isLoading}
                                                >
                                                    <MenuItem value="">Select Color</MenuItem>
                                                    {productRamsData.map((colorOption) => (
                                                        <MenuItem
                                                            key={colorOption._id}
                                                            value={colorOption.name}
                                                        >
                                                            {colorOption.name}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <FormLabel sx={{ display: 'block', mb: 1, fontWeight: 500 }}>
                                                    Color Images
                                                </FormLabel>
                                                <Box display="flex" gap={1} flexWrap="wrap">
                                                    <Paper
                                                        sx={{
                                                            width: 80,
                                                            height: 80,
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            border: '2px dashed #ccc',
                                                            cursor: 'pointer',
                                                            '&:hover': { borderColor: '#1976d2' }
                                                        }}
                                                        component="label"
                                                    >
                                                        <input
                                                            type="file"
                                                            multiple
                                                            accept="image/*"
                                                            hidden
                                                            onChange={(e) => handleColorImageUpload(index, e.target.files)}
                                                            disabled={isLoading}
                                                        />
                                                        <FaImage color="#ccc" size={20} />
                                                    </Paper>
                                                    {/* Uploaded images mapped here */}
                                                    {variation.color.images?.map((img, imgIndex) => (
                                                        <Box key={imgIndex} sx={{ position: 'relative', width: 80, height: 80 }}>
                                                            <img
                                                                src={img}
                                                                alt={`variation-${index}-img-${imgIndex}`}
                                                                style={{
                                                                    width: '100%',
                                                                    height: '100%',
                                                                    objectFit: 'cover',
                                                                    borderRadius: '4px'
                                                                }}
                                                            />
                                                            <IconButton
                                                                size="small"
                                                                sx={{
                                                                    position: 'absolute',
                                                                    top: -8,
                                                                    right: -8,
                                                                    bgcolor: 'error.main',
                                                                    color: 'white',
                                                                    width: 20,
                                                                    height: 20,
                                                                    '&:hover': { bgcolor: 'error.dark' }
                                                                }}
                                                                onClick={() => removeColorImage(index, img)}
                                                                disabled={isLoading}
                                                            >
                                                                <IoMdClose fontSize="small" />
                                                            </IconButton>
                                                        </Box>
                                                    ))}
                                                </Box>
                                            </Grid>
                                        </Grid>

                                        <Box mt={2}>
                                            <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
                                                <FormLabel sx={{ fontWeight: 500 }}>Sizes</FormLabel>
                                                <Button
                                                    variant="text"
                                                    size="small"
                                                    startIcon={<IoMdAdd />}
                                                    onClick={() => handleAddSize(index)}
                                                    disabled={isLoading}
                                                >
                                                    Add Size
                                                </Button>
                                            </Box>

                                            {/* Size items mapped here */}
                                            {variation.sizes.map((size, sizeIndex) => (
                                                <Grid container spacing={1} alignItems="center" sx={{ mb: 1 }} key={sizeIndex}>
                                                    <Grid item xs={3}>
                                                        <Select
                                                            size="small"
                                                            fullWidth
                                                            displayEmpty
                                                            value={size.label}
                                                            onChange={(e) =>
                                                                handleSizeChange(index, sizeIndex, "label", e.target.value)
                                                            }
                                                            disabled={isLoading}
                                                        >
                                                            <MenuItem value="">Size</MenuItem>
                                                            {productSizeData.map((sizeOption) => (
                                                                <MenuItem
                                                                    key={sizeOption._id}
                                                                    value={sizeOption.name}
                                                                >
                                                                    {sizeOption.name}
                                                                </MenuItem>
                                                            ))}
                                                        </Select>
                                                    </Grid>
                                                    <Grid item xs={3}>
                                                        <TextField
                                                            size="small"
                                                            type="number"
                                                            placeholder="Price"
                                                            fullWidth
                                                            value={size.price}
                                                            onChange={(e) =>
                                                                handleSizeChange(index, sizeIndex, "price", e.target.value)
                                                            }
                                                            disabled={isLoading}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={3}>
                                                        <TextField
                                                            size="small"
                                                            type="number"
                                                            placeholder="Stock"
                                                            fullWidth
                                                            value={size.countInStock}
                                                            onChange={(e) =>
                                                                handleSizeChange(index, sizeIndex, "countInStock", e.target.value)
                                                            }
                                                            disabled={isLoading}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={3}>
                                                        <IconButton
                                                            size="small"
                                                            color="error"
                                                            onClick={() => handleRemoveSize(index, sizeIndex)}
                                                            disabled={isLoading}
                                                        >
                                                            <IoMdClose />
                                                        </IconButton>
                                                    </Grid>
                                                </Grid>
                                            ))}
                                        </Box>
                                    </Paper>
                                ))}
                            </CardContent>
                        </Card>

                        {/* Product Images Card */}
                        <Card sx={{ mb: 3, border: '1px solid #e0e0e0' }}>
                            <CardContent>
                                <Box display="flex" alignItems="center" gap={1} mb={2}>
                                    <FaImage color="#1976d2" />
                                    <Typography variant="h6" color="primary">Product Images</Typography>
                                </Box>
                                <Grid container spacing={2}>
                                    {/* Existing images mapped here */}
                                    {previews?.map((image, index) => (
                                        <Grid item xs={6} sm={3} key={index}>
                                            <Paper sx={{ position: 'relative', height: 150 }}>
                                                <IconButton
                                                    size="small"
                                                    sx={{
                                                        position: 'absolute',
                                                        top: -8,
                                                        right: -8,
                                                        bgcolor: 'error.main',
                                                        color: 'white',
                                                        width: 20,
                                                        height: 20,
                                                        zIndex: 10,
                                                        '&:hover': { bgcolor: 'error.dark' }
                                                    }}
                                                    onClick={() => removeImg(image, index)}
                                                    disabled={isLoading}
                                                >
                                                    <IoMdClose fontSize="small" />
                                                </IconButton>
                                                <img
                                                    src={image}
                                                    alt={`product-${index}`}
                                                    style={{
                                                        width: '100%',
                                                        height: '100%',
                                                        objectFit: 'cover',
                                                        borderRadius: '4px'
                                                    }}
                                                />
                                            </Paper>
                                        </Grid>
                                    ))}
                                    <Grid item xs={6} sm={3}>
                                        <Paper
                                            sx={{
                                                height: 150,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                border: '2px dashed #ccc',
                                                cursor: 'pointer',
                                                '&:hover': { borderColor: '#1976d2', bgcolor: '#f5f5f5' }
                                            }}
                                            component="label"
                                        >
                                            <input
                                                type="file"
                                                multiple
                                                accept="image/*"
                                                hidden
                                                onChange={(e) => handleProductImageUpload(e.target.files)}
                                                disabled={isLoading}
                                            />
                                            <Box textAlign="center">
                                                <FaCloudUploadAlt size={24} color="#ccc" />
                                                <Typography variant="caption" display="block" mt={1}>
                                                    Upload Images
                                                </Typography>
                                            </Box>
                                        </Paper>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>

                        {/* Banner Settings Card */}
                        <Card sx={{ mb: 3, border: '1px solid #e0e0e0' }}>
                            <CardContent>
                                <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                                    <Box display="flex" alignItems="center" gap={1}>
                                        <BsCardImage color="#1976d2" />
                                        <Typography variant="h6" color="primary">Banner Settings</Typography>
                                    </Box>
                                    <Box display="flex" alignItems="center" gap={1}>
                                        <Typography variant="body2">Display on Banner</Typography>
                                        <Switch
                                            checked={checkedSwitch}
                                            onChange={handleChangeSwitch}
                                            disabled={isLoading}
                                        />
                                    </Box>
                                </Box>

                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <FormLabel sx={{ display: 'block', mb: 1, fontWeight: 500 }}>
                                            Banner Title
                                        </FormLabel>
                                        <TextField
                                            variant="outlined"
                                            size="small"
                                            fullWidth
                                            placeholder="Enter banner title"
                                            name="bannerTitleName"
                                            value={formFields.bannerTitleName}
                                            onChange={onChangeInput}
                                            disabled={isLoading}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormLabel sx={{ display: 'block', mb: 1, fontWeight: 500 }}>
                                            Banner Images
                                        </FormLabel>
                                        <Grid container spacing={2}>
                                            {/* Banner images mapped here */}
                                            {bannerPreviews?.map((image, index) => (
                                                <Grid item xs={6} sm={3} key={index}>
                                                    <Paper sx={{ position: 'relative', height: 150 }}>
                                                        <IconButton
                                                            size="small"
                                                            sx={{
                                                                position: 'absolute',
                                                                top: -8,
                                                                right: -8,
                                                                bgcolor: 'error.main',
                                                                color: 'white',
                                                                width: 20,
                                                                height: 20,
                                                                zIndex: 10,
                                                                '&:hover': { bgcolor: 'error.dark' }
                                                            }}
                                                            onClick={() => removeBannerImg(image, index)}
                                                            disabled={isLoading}
                                                        >
                                                            <IoMdClose fontSize="small" />
                                                        </IconButton>
                                                        <img
                                                            src={image}
                                                            alt={`banner-${index}`}
                                                            style={{
                                                                width: '100%',
                                                                height: '100%',
                                                                objectFit: 'cover',
                                                                borderRadius: '4px'
                                                            }}
                                                        />
                                                    </Paper>
                                                </Grid>
                                            ))}
                                            <Grid item xs={6} sm={3}>
                                                <Paper
                                                    sx={{
                                                        height: 150,
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        border: '2px dashed #ccc',
                                                        cursor: 'pointer',
                                                        '&:hover': { borderColor: '#1976d2', bgcolor: '#f5f5f5' }
                                                    }}
                                                    component="label"
                                                >
                                                    <input
                                                        type="file"
                                                        multiple
                                                        accept="image/*"
                                                        hidden
                                                        onChange={(e) => handleBannerImageUpload(e.target.files)}
                                                        disabled={isLoading}
                                                    />
                                                    <Box textAlign="center">
                                                        <FaCloudUploadAlt size={24} color="#ccc" />
                                                        <Typography variant="caption" display="block" mt={1}>
                                                            Upload Banner
                                                        </Typography>
                                                    </Box>
                                                </Paper>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>

                        {/* Submit Button */}
                        <Card>
                            <CardContent>
                                <Box display="flex" justifyContent="flex-end" gap={2}>
                                    <Button
                                        variant="outlined"
                                        size="large"
                                        sx={{ minWidth: 120 }}
                                        disabled={isLoading}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        size="large"
                                        startIcon={
                                            isLoading ? (
                                                <CircularProgress size={20} color="inherit" />
                                            ) : (
                                                <FaCloudUploadAlt />
                                            )
                                        }
                                        sx={{ minWidth: 200 }}
                                        disabled={isLoading}
                                    >
                                        {isEditMode ? "Update Product" : "Publish Product"}
                                    </Button>
                                </Box>
                            </CardContent>
                        </Card>
                    </Box>
                </CardContent>
            </Card>
        </Grid>
    </Grid>
</Box>

<section className="py-3 lg:py-10 w-full">
      <div className="container flex flex-col lg:flex-row gap-5">
        <div className="w-full lg:w-[20%]">
          <AccountSidebar />
        </div>

        <div className="w-full lg:w-[80%]">
          <div className="card bg-white p-5 shadow-md rounded-md">
            <div className="flex items-center pb-3">
              <h2 className="pb-0">
                {isEditMode ? "Edit Product" : "Add New Product"}
              </h2>
            </div>
            <hr />

            <form className="mt-8" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                <div className="col">
                  <FormLabel>Product Name</FormLabel>
                  <TextField
                    variant="outlined"
                    size="small"
                    className="w-full"
                    name="name"
                    value={formFields.name}
                    onChange={onChangeInput}
                    disabled={isLoading}
                  />
                </div>

                <div className="col">
                  <FormLabel>Product Arabic Name</FormLabel>
                  <TextField
                    variant="outlined"
                    size="small"
                    className="w-full"
                    name="arbName"
                    value={formFields.arbName}
                    onChange={onChangeInput}
                    disabled={isLoading}
                  />
                </div>

                <div className="col">
                  <FormLabel>Product Description</FormLabel>
                  <TextField
                    variant="outlined"
                    size="small"
                    className="w-full"
                    name="description"
                    value={formFields.description}
                    onChange={onChangeInput}
                    disabled={isLoading}
                    multiline
                    rows={4}
                  />
                </div>

                <div className="col">
                  <FormLabel>Product Arabic Description</FormLabel>
                  <TextField
                    variant="outlined"
                    size="small"
                    className="w-full"
                    name="arbDescription"
                    value={formFields.arbDescription}
                    onChange={onChangeInput}
                    disabled={isLoading}
                    multiline
                    rows={4}
                  />
                </div>

                <div className="col">
                  <FormLabel>Product Brand</FormLabel>
                  <TextField
                    variant="outlined"
                    size="small"
                    className="w-full"
                    name="brand"
                    value={formFields.brand}
                    onChange={onChangeInput}
                    disabled={isLoading}
                  />
                </div>

                <div className="col">
                  <FormLabel>Product Price</FormLabel>
                  <TextField
                    variant="outlined"
                    size="small"
                    type="number"
                    className="w-full"
                    name="price"
                    value={formFields.price}
                    onChange={onChangeInput}
                    disabled={isLoading}
                  />
                </div>

                <div className="col">
                  <FormLabel>Product Old Price</FormLabel>
                  <TextField
                    variant="outlined"
                    size="small"
                    type="number"
                    className="w-full"
                    name="oldPrice"
                    value={formFields.oldPrice}
                    onChange={onChangeInput}
                    disabled={isLoading}
                  />
                </div>

                <div className="col">
                  <FormLabel>Product Category</FormLabel>
                  {context?.catData?.length > 0 && (
                    <Select
                      size="small"
                      className="w-full"
                      value={productCat}
                      onChange={handleChangeProductCat}
                      disabled={isLoading}
                    >
                      {context?.catData?.map((cat) => (
                        <MenuItem key={cat?._id} value={cat?._id}>
                          {cat?.name}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                </div>

                <div className="col">
                  <FormLabel>Product Sub Category</FormLabel>
                  {context?.catData?.length > 0 && (
                    <Select
                      size="small"
                      className="w-full"
                      value={productSubCat}
                      onChange={handleChangeProductSubCat}
                      disabled={isLoading}
                    >
                      {context?.catData
                        ?.flatMap((cat) => cat?.children)
                        ?.map((subCat) => (
                          <MenuItem key={subCat?._id} value={subCat?._id}>
                            {subCat?.name}
                          </MenuItem>
                        ))}
                    </Select>
                  )}
                </div>

                <div className="col">
                  <FormLabel>Product Third Level Category</FormLabel>
                  {context?.catData?.length > 0 && (
                    <Select
                      size="small"
                      className="w-full"
                      value={productThirdLavelCat}
                      onChange={handleChangeProductThirdLavelCat}
                      disabled={isLoading}
                    >
                      {context?.catData
                        ?.flatMap((cat) => cat?.children)
                        ?.flatMap((subCat) => subCat?.children)
                        ?.map((thirdLavelCat) => (
                          <MenuItem
                            key={thirdLavelCat?._id}
                            value={thirdLavelCat?._id}
                          >
                            {thirdLavelCat?.name}
                          </MenuItem>
                        ))}
                    </Select>
                  )}
                </div>

                <div className="col">
                  <FormLabel>Product Stock</FormLabel>
                  <TextField
                    variant="outlined"
                    size="small"
                    type="number"
                    className="w-full"
                    name="countInStock"
                    value={formFields.countInStock}
                    onChange={onChangeInput}
                    disabled={isLoading}
                  />
                </div>

                <div className="col">
                  <FormLabel>Product Discount</FormLabel>
                  <TextField
                    variant="outlined"
                    size="small"
                    type="number"
                    className="w-full"
                    name="discount"
                    value={formFields.discount}
                    onChange={onChangeInput}
                    disabled={isLoading}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </div>

                <div className="col">
                  <FormLabel>Product Tags</FormLabel>
                  <TextField
                    variant="outlined"
                    size="small"
                    className="w-full"
                    name="tags"
                    value={formFields.tags.join(", ")}
                    onChange={onChangeInput}
                    disabled={isLoading}
                    placeholder="Enter tags separated by commas"
                  />
                </div>

                <div className="col">
                  <FormLabel>Is Featured?</FormLabel>
                  <Select
                    size="small"
                    className="w-full"
                    value={productFeatured}
                    onChange={handleChangeProductFeatured}
                    disabled={isLoading}
                  >
                    <MenuItem value={true}>True</MenuItem>
                    <MenuItem value={false}>False</MenuItem>
                  </Select>
                </div>

                <div className="col">
                  <FormLabel>Product Rating</FormLabel>
                  <Rating
                    name="rating"
                    value={parseFloat(formFields.rating) || 0}
                    onChange={onChangeRating}
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="mt-5">
                <h3 className="font-bold text-lg mb-2">Product Variations</h3>
                {variations.map((variation, index) => (
                  <div
                    key={index}
                    className="border p-4 mb-4 bg-gray-50 rounded-md"
                  >
                    <div className="grid grid-cols-1 gap-2 mb-2">
                      <FormLabel>Color Label</FormLabel>
                      <select
                        value={variation.color.label}
                        onChange={(e) =>
                          handleVariationChange(index, "label", e.target.value)
                        }
                        className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] rounded-sm p-2 text-sm"
                        disabled={isLoading}
                      >
                        <option value="">Select Color</option>
                        {productRamsData.map((colorOption) => (
                          <option
                            key={colorOption._id}
                            value={colorOption.name}
                          >
                            {colorOption.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="mb-2">
                      <FormLabel>Color Images</FormLabel>
                      <div className="grid grid-cols-6 gap-2 mb-2">
                        <UploadBox
                          multiple={true}
                          name="colorImages"
                          url="/api/product/uploadColorImages"
                          setPreviewsFun={(uploadedImages) => {
                            setVariations((prevVariations) =>
                              prevVariations.map((variation, i) =>
                                i === index
                                  ? {
                                      ...variation,
                                      color: {
                                        ...variation.color,
                                        images: [
                                          ...(variation.color.images || []),
                                          ...uploadedImages,
                                        ],
                                      },
                                    }
                                  : variation
                              )
                            );
                          }}
                          disabled={isLoading}
                        />
                        <div className="flex flex-wrap mt-2">
                          {variations[index]?.color?.images?.map((img, i) => (
                            <div
                              key={i}
                              className="relative mr-2 mb-2"
                              style={{ width: "80px", height: "80px" }}
                            >
                              <img
                                src={img}
                                alt={`variation-${index}-img-${i}`}
                                className="w-full h-full object-cover rounded-md"
                              />
                              <button
                                onClick={() => removeColorImage(index, img)}
                                className="absolute -top-2 -right-2 bg-red-700 text-white rounded-full w-5 h-5 flex items-center justify-center text-sm z-10"
                                disabled={isLoading}
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mb-2">
                      <FormLabel>Sizes</FormLabel>
                      {variation.sizes.map((size, sIndex) => (
                        <div
                          key={sIndex}
                          className="grid grid-cols-4 gap-2 mb-2"
                        >
                          <select
                            value={size.label}
                            onChange={(e) =>
                              handleSizeChange(
                                index,
                                sIndex,
                                "label",
                                e.target.value
                              )
                            }
                            className="w-full h-[40px] border border-[rgba(0,0,0,0.2)] rounded-sm p-2 text-sm"
                            disabled={isLoading}
                          >
                            <option value="">Select size</option>
                            {productSizeData.map((sizeOption) => (
                              <option
                                key={sizeOption._id}
                                value={sizeOption.name}
                              >
                                {sizeOption.name}
                              </option>
                            ))}
                          </select>
                          <TextField
                            type="number"
                            placeholder="Price"
                            value={size.price}
                            onChange={(e) =>
                              handleSizeChange(
                                index,
                                sIndex,
                                "price",
                                e.target.value
                              )
                            }
                            variant="outlined"
                            size="small"
                            disabled={isLoading}
                          />
                          <TextField
                            type="number"
                            placeholder="Stock"
                            value={size.countInStock}
                            onChange={(e) =>
                              handleSizeChange(
                                index,
                                sIndex,
                                "countInStock",
                                e.target.value
                              )
                            }
                            variant="outlined"
                            size="small"
                            disabled={isLoading}
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveSize(index, sIndex)}
                            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                            disabled={isLoading}
                          >
                            - Remove size
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => handleAddSize(index)}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                        disabled={isLoading}
                      >
                        + Add Size
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleRemoveVariation(index)}
                      className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                      disabled={isLoading}
                    >
                      Remove Variation
                    </button>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={handleAddVariation}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                  disabled={isLoading}
                >
                  + Add Variation
                </button>
              </div>

              <div className="mt-5">
                <FormLabel>Media & Images</FormLabel>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {previews?.map((image, index) => (
                    <div className="uploadBoxWrapper relative" key={index}>
                      <span
                        className="absolute w-[20px] h-[20px] rounded-full bg-red-700 -top-[5px] -right-[5px] flex items-center justify-center z-50 cursor-pointer"
                        onClick={() => removeImg(image, index)}
                      >
                        <IoMdClose className="text-white text-[17px]" />
                      </span>
                      <div className="uploadBox p-0 rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.3)] h-[150px] w-full bg-gray-100">
                        <img
                          src={image}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  ))}
                  <UploadBox
                    multiple={true}
                    name="images"
                    url="/api/product/vendorProductImagesUpload"
                    setPreviewsFun={setPreviewsFun}
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="mt-5">
                <div className="bg-gray-100 p-4 w-full">
                  <div className="flex items-center gap-8">
                    <FormLabel>Banner Images</FormLabel>
                    <Switch
                      onChange={handleChangeSwitch}
                      checked={checkedSwitch}
                      disabled={isLoading}
                    />
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {bannerPreviews?.map((image, index) => (
                      <div className="uploadBoxWrapper relative" key={index}>
                        <span
                          className="absolute w-[20px] h-[20px] rounded-full bg-red-700 -top-[5px] -right-[5px] flex items-center justify-center z-50 cursor-pointer"
                          onClick={() => removeBannerImg(image, index)}
                        >
                          <IoMdClose className="text-white text-[17px]" />
                        </span>
                        <div className="uploadBox p-0 rounded-md overflow-hidden border border-dashed border-[rgba(0,0,0,0.3)] h-[150px] w-full bg-gray-100">
                          <img
                            src={image}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    ))}
                    <UploadBox
                      multiple={true}
                      name="bannerimages"
                      url="/api/product/uploadBannerImages"
                      setPreviewsFun={setBannerImagesFun}
                      disabled={isLoading}
                    />
                  </div>
                  <br />
                  <FormLabel>Banner Title</FormLabel>
                  <TextField
                    variant="outlined"
                    size="small"
                    className="w-full"
                    name="bannerTitleName"
                    value={formFields.bannerTitleName}
                    onChange={onChangeInput}
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="flex items-center gap-4 mt-5">
                <Button
                  type="submit"
                  className="btn-org btn-sm w-[200px] flex gap-2"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <CircularProgress color="inherit" />
                  ) : (
                    <>
                      <FaCloudUploadAlt className="text-[25px] text-white" />
                      {isEditMode ? "Update Product" : "Publish and View"}
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>